const fitFrame = (frame: HTMLIFrameElement): void => {
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.border = '0';
};

const loadExternalScript = (
    script: HTMLScriptElement,
    src: string,
): Promise<void> =>
    new Promise((resolve) => {
        const handleDone = (): void => {
            resolve();
        };

        script.addEventListener('load', handleDone);
        script.addEventListener('error', handleDone);
        script.src = src;
    });

export const mountMusicEmbed = async (
    root: HTMLElement,
    html: string,
    isActive: () => boolean,
): Promise<void> => {
    root.innerHTML = html;

    const frames = root.querySelectorAll('iframe');

    frames.forEach((node) => {
        if (node instanceof HTMLIFrameElement) {
            fitFrame(node);
        }
    });

    const scripts = Array.from(root.querySelectorAll('script'));

    for (const node of scripts) {
        if (!isActive()) {
            return;
        }

        const next = document.createElement('script');
        const type = node.getAttribute('type');
        const src = node.getAttribute('src');

        if (type) {
            next.type = type;
        }

        node.replaceWith(next);

        if (!src) {
            next.text = node.textContent ?? '';
            continue;
        }

        await loadExternalScript(next, src);
    }
};
