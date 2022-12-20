import { Modal, Form, Input } from "antd";

const BidModal = ({ bidderName, open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal 
            open={open}
            title="Bid for the item"
            onText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        // console.log(values)
                        
                        const { bidPrice } = values;
                        onCreate(bidderName, bidPrice);

                    }).catch((e) => {
                        window.alert(e);
                    })
            }} >

            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item 
                    name="bidPrice"
                    label="Enter the desired bid price"
                    rules={[
                        {
                            required: true,
                            message: "Error: Please enter a desired bid price!",
                        },
                    ]} 
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default BidModal;
