import { Modal, Form, Input, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const AddPostModal = ({ open, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            open={open}
            title="Add a new post"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
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
                    label="Upload Items" 
                    rules={[
                        {
                            required: true,
                            message: "Error: Please upload some item photo!",
                        },
                    ]} 
                    valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
            </Form>
        
        </Modal>
    );
};

export default AddPostModal;
