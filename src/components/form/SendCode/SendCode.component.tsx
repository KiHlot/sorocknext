import { FC, useEffect, useState } from 'react';
import styles from '@/components/form/SendCode/SendCode.module.scss';
import { SendCodePropsIF } from '@/components/form/SendCode/SendCode.types';

const SendCode: FC<SendCodePropsIF> = ({ digitsCount = 4, className = '' }) => {
    const [itemsMap, setItemsMap] = useState<string[]>([]);

    useEffect(() => {
        setItemsMap(
            Array.from(
                { length: digitsCount },
                (_, index) => `digit-input-${index + 1}`,
            ),
        );
    }, [digitsCount]);
    //TODO доделать
    const [digits, setDigits] = useState(['', '', '', '']);
    const [combinedValue, setCombinedValue] = useState('');

    const handleInputChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newDigits = [...digits];
            newDigits[index] = value;
            setDigits(newDigits);

            // Обновляем объединенное значение
            setCombinedValue(newDigits.join(''));

            // Автоматически переходим к следующему инпуту, если введена цифра
            if (value && index < 3) {
                document.getElementById(`digit-input-${index}`).focus();
            }
        }
    };
    return (
        <div className={`${styles.SendCodeWrapper} ${className}`}>
            <div className={styles.digitsWrapper}>
                {itemsMap.map((name, index) => (
                    <div key={name}>
                        <input
                            id={name}
                            name={name}
                            type="text"
                            value=""
                            onChange={e =>
                                handleInputChange(index, e.target.value)
                            }
                            maxLength={1}
                            style={{ width: '30px', marginRight: '5px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SendCode;
