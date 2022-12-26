import { Modal, Form, Input } from "antd";

const BecomeSellerModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            open={open}
            title="Provide more information to become a seller"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        // console.log(values)
                        
                        const { realName, address } = values
                        onCreate(realName, address);
                
                    }).catch((e) => {
                        window.alert(e);
                    })
            }} >

            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item 
                    name="realName"
                    label="Enter your real name"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter your real name!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="address"
                    label="Enter your address"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter your address!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default BecomeSellerModal;
