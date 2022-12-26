import { Modal, Form, Input } from "antd";

const RateModal = ({ raterName, open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            open={open}
            title="Rate the post"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        // console.log(values)
                        
                        const { rate } = values;
                        onCreate(raterName, rate);

                    }).catch((e) => {
                        window.alert(e);
                    })
            }} >

            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item 
                    name="rate"
                    label="Rate this post 1-5"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter a desired rate!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RateModal;
