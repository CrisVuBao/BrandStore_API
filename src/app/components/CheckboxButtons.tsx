import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || [])

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === - 1) newChecked = [...checkedItems, value]; // nếu ko check gì cả , là có index = -1, thì vẫn giữ nguyên các data product của checked trước đó
        else newChecked = checkedItems.filter(item => item !== value); //  ngược lại, nếu check thêm 1 cái, thì sẽ lọc ra các dữ liệu(product) của cái mình mới check đó
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item}
                    key={item} />
            ))}
        </FormGroup>
    )
}