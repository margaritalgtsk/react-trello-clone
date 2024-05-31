import React, {useState} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {setError} from "../../store/slices/errorSlice";
import {addList} from "../../store/slices/boardSlice";
import {v4} from 'uuid';
import {Button, Input} from "antd";
import {HiOutlinePlus} from "react-icons/hi";
import {IoMdClose} from "react-icons/io";
import classes from '../AddListForm/AddListForm.module.css'

const AddListForm: React.FC = () => {
    const [listTitle, setListTitle] = useState<string>('')
    const [visibleListForm, setVisibleListForm] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const addListTitle = (): void => {
        if(!listTitle) {
            dispatch(setError({message: 'Please, add title for list', type: 'error'}))
        } else {
            const listItem = {
                id: v4(),
                title: listTitle
            }
            dispatch(addList(listItem))
            setListTitle('')
            setVisibleListForm(false)
        }
    }

    return (
        <div className={classes.addListColumn}>
            {visibleListForm
                ? (
                    <div className={classes.addListForm}>
                        <Input
                            className={classes.addListInput}
                            type="text"
                            placeholder="List title"
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                        />
                        <Button className={classes.addListButton} type="primary" onClick={addListTitle}>Add list</Button>
                        <IoMdClose  className={classes.closeListForm} onClick={() => {
                            setListTitle('')
                            setVisibleListForm(false)
                        }}/>
                    </div>
                ) : (
                    <div className={classes.addListPlus} onClick={() => setVisibleListForm(true)}>
                        <HiOutlinePlus/>
                        <div>Add another list</div>
                    </div>
                )
            }
        </div>
    );
};

export default AddListForm;