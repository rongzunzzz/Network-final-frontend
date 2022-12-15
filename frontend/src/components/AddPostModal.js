import { Modal, Form, Input, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { useState } from "react";

const AddPostModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [fileUrl, setFileUrl] = useState('')

    const handleChange = (e) => {
        // console.log(e.target.files);
        // console.log(URL.createObjectURL(e.target.files[0]))
        setFileUrl(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <Modal 
            open={open}
            title="Add a new post"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        // console.log(values)
                        // console.log(fileUrl)
                        
                        const { postTitle, postContent } = values;
                        onCreate(postTitle, postContent, fileUrl);

                    }).catch((e) => {
                        window.alert(e);
                    })
                console.log("New post added!")
            }} >

            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item 
                    name="postTitle"
                    label="Post Title"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter a post title!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="postContent"
                    label="Post Content"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter some post content!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="postItem"
                    label="Upload an Item"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please upload some item photo!",
                        },
                    ]} 
                >
                    <input type="file" onChange={handleChange} />
                </Form.Item>
                {/* <Form.Item 
                    // name={['0']}
                    label="Upload Items" 
                    rules={[
                        {
                            required: true,
                            message: "Error: Please upload some item photo!",
                        },
                    ]} 
                    valuePropName="fileList">
                    <Upload 
                        action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                        // action={'https://localhost:3000/'}
                        listType="picture-card"
                        beforeUpload={(file, fileList) => {
                            console.log(fileList)
                        }}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item> */}
            </Form>
        
        </Modal>
    );
};

export default AddPostModal;
