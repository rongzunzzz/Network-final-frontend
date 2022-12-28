import { Modal, Form, Input } from "antd";

const RegisterModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            open={open}
            title="Your account does not exist, provide information to register!"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        // console.log(values)
                        
                        const { account, name, phoneNum, password } = values
                        onCreate(account, name, phoneNum, password);
                
                    }).catch((e) => {
                        window.alert(e);
                    })
            }} >

            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item 
                    name="account"
                    label="Set your account"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please set an account!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="name"
                    label="Enter your name"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter your name!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="phoneNum"
                    label="Enter your phone number"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter your phone number!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="password"
                    label="Set your password"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter your phone number!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RegisterModal;
