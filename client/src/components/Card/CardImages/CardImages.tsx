import React from 'react';
import {Checkbox, Image, Upload, Button, UploadFile} from "antd";
import {setError} from "../../../store/slices/errorSlice";
import {addImage, removeImage, setCoverImage} from "../../../store/slices/boardSlice";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {UploadRequestOption} from 'rc-upload/lib/interface';
import {getImageUrl} from "../../../utils/images";
import {useAppDispatch} from "../../../store/hooks";
import {UploadOutlined} from '@ant-design/icons';
import classes from "./CardImages.module.css";

interface ICardUploadProps {
    id: string;
    listTitle: string;
    images?: UploadFile[];
    cover?: UploadFile;
}
const CardImages: React.FC<ICardUploadProps> = ({id, listTitle, images, cover}) => {

    const dispatch = useAppDispatch();

    const handleCustomRequest = (options: UploadRequestOption) => {
        const data = new FormData();
        data.append('file', options.file);
        fetch('http://localhost:8080/image', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (response.ok) {
                dispatch(addImage({ listTitle, id, file: options.file as UploadFile}));
            } else {
                dispatch(setError({message: `Server error, ${response.statusText}`, type: 'error'}));
            }
        })
        .catch(error => {
            dispatch(setError({message: `Network error, ${error}`, type: 'error'}));
        });
    }

    const handleCheckboxChange = (e:CheckboxChangeEvent, image: UploadFile): void => {
        dispatch(setCoverImage({id, listTitle, image: e.target.checked ? image : undefined}))
    };

    return (
        <>
            <Upload showUploadList={false} customRequest={handleCustomRequest}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            {images && images?.length > 0 &&
                <>
                    <p>Attachments:</p>
                    {images.map((image: UploadFile) =>
                        <div key={image.uid} className={classes.imageWrapper}>
                            <Image
                                width={120} height={120}
                                src={getImageUrl(image.name)}
                                alt={image.name}
                                className={classes.imageThumb}
                            />
                            <div className={classes.imageOptions}>
                                <Checkbox
                                    checked={image.uid === cover?.uid}
                                    onChange={(e: CheckboxChangeEvent) => handleCheckboxChange(e, image)}>
                                    Make cover
                                </Checkbox>
                                <p className={classes.imageRemove}
                                   onClick={() => dispatch(removeImage({id, listTitle, imageId: image.uid }))}>
                                    Delete
                                </p>
                            </div>
                        </div>
                    )}
                </>
            }
        </>
    );
};

export default CardImages;