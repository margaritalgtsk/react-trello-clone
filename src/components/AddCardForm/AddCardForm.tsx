import React, {useState} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {setError} from "../../store/slices/errorSlice";
import {addItem} from "../../store/slices/boardSlice";
import {v4} from 'uuid';
import {Button, Input} from "antd";
import {HiOutlinePlus} from "react-icons/hi";
import {IoMdClose} from "react-icons/io";
import classes from './AddCardForm.module.css';

interface IAddCardFormProps {
    listTitle: string;
}
const AddCardForm: React.FC<IAddCardFormProps> = ({listTitle}) => {

    const [cardTitle, setCardTitle] = useState<string>('');
    const [visibleCardForm, setVisibleCardForm] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const addCardTitle = (): void => {
        if (!cardTitle){
            dispatch(setError('Please, add title for card'))
        } else {
            const item = {
                id: v4(),
                title: cardTitle
            }
            dispatch(addItem({item, listTitle}))
            setCardTitle('')
            setVisibleCardForm(false)
        }
    }

    return (
        <div>
            {visibleCardForm
                ? (
                    <div className={classes.addCardForm}>
                        <Input
                            className={classes.addCardInput}
                            type="text"
                            placeholder="Сard title"
                            value={cardTitle}
                            onChange={(e) => setCardTitle(e.target.value)}
                        />
                        <Button type="primary" onClick={addCardTitle}>Add card</Button>
                        <IoMdClose className={classes.closeCardForm} onClick={() => {
                            setCardTitle('')
                            setVisibleCardForm(false)
                        }}/>
                    </div>
                ) : (
                    <div className={classes.addCardPlus} onClick={() => setVisibleCardForm(true)}>
                        <HiOutlinePlus/>
                        <div>Add a card</div>
                    </div>
                )
            }
        </div>
    );
};

export default AddCardForm;