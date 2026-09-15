import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const SOURCE_DIR = resolve(projectRoot, '.cursor');
const TARGET_DIR = resolve(projectRoot, 'prompts/cursor');

const RULES_DIR = 'rules';
const SKILLS_DIR = 'skills';
const SKILL_FILE = 'SKILL.md';

const copyFileAs = async (src_path, dest_path) => {
    await mkdir(dirname(dest_path), { recursive: true });
    const content = await readFile(src_path);
    await writeFile(dest_path, content);
};

const renameMdc = (name) => name.replace(/\.mdc$/, '.md');

const processRules = async (rules_source, rules_target) => {
    if (!existsSync(rules_source)) {
        return;
    }

    const entries = await readdir(rules_source, { withFileTypes: true });

    for (const entry of entries) {
        const src_path = join(rules_source, entry.name);
        const dest_path = join(rules_target, renameMdc(entry.name));

        if (entry.isDirectory()) {
            await processRules(src_path, dest_path);
            continue;
        }

        await copyFileAs(src_path, dest_path);
    }
};

const processSkills = async (skills_source, skills_target) => {
    if (!existsSync(skills_source)) {
        return;
    }

    await mkdir(skills_target, { recursive: true });

    const entries = await readdir(skills_source, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) {
            console.warn(
                `[sync-cursor] Пропущен файл верхнего уровня в skills/: ${entry.name}`,
            );
            continue;
        }

        const skill_source = join(skills_source, entry.name, SKILL_FILE);

        if (!existsSync(skill_source)) {
            console.warn(
                `[sync-cursor] Пропущен скилл без ${SKILL_FILE}: ${entry.name}`,
            );
            continue;
        }

        await copyFileAs(skill_source, join(skills_target, `${entry.name}.md`));
    }
};

const copyDir = async (src_path, dest_path) => {
    const entries = await readdir(src_path, { withFileTypes: true });

    for (const entry of entries) {
        const next_source = join(src_path, entry.name);
        const next_target = join(dest_path, renameMdc(entry.name));

        if (entry.isDirectory()) {
            await copyDir(next_source, next_target);
            continue;
        }

        await copyFileAs(next_source, next_target);
    }
};

const sync = async () => {
    if (!existsSync(SOURCE_DIR)) {
        console.warn(`[sync-cursor] Нет папки ${SOURCE_DIR} — пропускаем.`);
        return;
    }

    await rm(TARGET_DIR, { recursive: true, force: true });
    await mkdir(TARGET_DIR, { recursive: true });

    const entries = await readdir(SOURCE_DIR, { withFileTypes: true });

    for (const entry of entries) {
        const src_path = join(SOURCE_DIR, entry.name);

        if (entry.name === RULES_DIR && entry.isDirectory()) {
            await processRules(src_path, join(TARGET_DIR, RULES_DIR));
            continue;
        }

        if (entry.name === SKILLS_DIR && entry.isDirectory()) {
            await processSkills(src_path, join(TARGET_DIR, SKILLS_DIR));
            continue;
        }

        if (entry.isDirectory()) {
            await copyDir(src_path, join(TARGET_DIR, entry.name));
            continue;
        }

        await copyFileAs(src_path, join(TARGET_DIR, entry.name));
    }

    console.log(
        `[sync-cursor] ${relative(projectRoot, SOURCE_DIR)} → ${relative(projectRoot, TARGET_DIR)}`,
    );
};

sync().catch((error) => {
    console.error('[sync-cursor] Ошибка:', error);
    process.exit(1);
});
