import { Button, Form, Icon, Modal } from "semantic-ui-react";
import React, { useState } from "react";

const AddSubmissionButton = ({ onClick }) => {
    return (
        <Button icon labelPosition="left" onClick={onClick}>
            <Icon name="plus" />
            Add Image
        </Button>
    );
};

export const AddSubmission = ({ onAdded }) => {
    const [values, setValues] = useState({
        link: "",
        fulfilled: "",
        requested: "",
    });
    const [isOpen, setOpen] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const resetValues = () => {
        setValues({ link: "", fulfilled: "", requested: "" });
    };

    return (
        <Modal
            trigger={<AddSubmissionButton onClick={() => setOpen(true)} />}
            onClose={() => {
                resetValues();
                setOpen(false);
            }}
            open={isOpen}
        >
            <Modal.Header content="Manually add an image to the album." />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Image URL</label>
                        <input
                            name="link"
                            value={values.link}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Requested By</label>
                        <input
                            name="requested"
                            value={values.requested}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Fulfilled By</label>
                        <input
                            name="fulfilled"
                            value={values.fulfilled}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        onAdded(
                            values.link,
                            values.requested,
                            values.fulfilled
                        );
                        setOpen(false);
                    }}
                    positive
                    labelPosition="right"
                    icon="checkmark"
                    content="Add"
                />
            </Modal.Actions>
        </Modal>
    );
};
