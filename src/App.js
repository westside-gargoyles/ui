import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Form, Divider, Grid, Image, Card} from "semantic-ui-react";
// import ipfs from "./ipfs";
import "./App.css";
import firebase from "./firebase";

const options = [
    {key: "m", text: "Male", value: "male"},
    {key: "f", text: "Female", value: "female"},
    {key: "o", text: "Other", value: "other"}
];

function App() {
    const {register, handleSubmit, setValue, errors, triggerValidation} = useForm();
    const [imageData, setImageData] = useState(null);

    // Validations
    useEffect(() => {
        register({name: "firstName"}, {required: true}, {pattern: /^[A-Za-z]+$/i});
        register({name: "lastName"}, {required: true}, {pattern: /^[A-Za-z]+$/i});
        register({name: "genderSelect"}, {required: true});
        register({name: "age"}, {required: true}, {min: 10, max: 99});
        register({name: "lastSeenDateTime"}, {required: true});
        register({name: "lastSeenLocation"}, {required: true});
        register({name: "height"}, {required: true});
        register({name: "description"}, {required: true});
        register({name: "checkBox"}, {required: true});
    }, [register]);

    const handleFileChange = e => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();

        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setImageData({
                preview: URL.createObjectURL(file),
                raw: file,
                buffer: Buffer(reader.result)
            });
        };
    };

    const onSubmit = (data, e) => {
        console.log(e);
        console.log(data);
        console.log(imageData);

        let {
            firstName,
            lastName,
            genderSelect,
            age,
            lastSeenDateTime,
            lastSeenLocation,
            height,
            description,
            checkBox
        } = data;

        try {
            const db = firebase.firestore();
            db.collection("Reports").add({
                firstName,
                lastName,
                genderSelect,
                age,
                lastSeenDateTime,
                lastSeenLocation,
                height,
                description,
                checkBox,
                imageData: "" + imageData.preview
            });
        } catch (err) {
            console.log(err);
        }
    };

    console.log(errors);

    return (
        <Form className='app-form' onSubmit={handleSubmit(onSubmit)}>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Form.Input
                        name='imageFile'
                        fluid
                        label='Picture'
                        placeholder='First name'
                        type='file'
                        onChange={handleFileChange}
                        error={errors.imageFile ? true : false}
                    />
                    <Card style={{width: "100%"}}>
                        {imageData && imageData.preview ? (
                            <Image src={imageData.preview} wrapped ui={false} alt='' />
                        ) : (
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                wrapped
                                ui={false}
                            />
                        )}
                    </Card>
                </Grid.Column>

                <Grid.Column>
                    <Form.Input
                        name='firstName'
                        fluid
                        label='First Name:'
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.firstName ? true : false}
                        placeholder='First name'
                    />

                    <Form.Input
                        name='lastName'
                        fluid
                        label='Last Name:'
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.lastName ? true : false}
                        placeholder='Last name'
                    />
                    <Form.Select
                        name='genderSelect'
                        options={options}
                        placeholder='Gender'
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.genderSelect ? true : false}
                    />

                    <Form.Input
                        name='age'
                        fluid
                        label='Age:'
                        style={{width: "25%"}}
                        type='number'
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.age ? true : false}
                        placeholder='Age'
                    />

                    <Form.Input
                        name='height'
                        fluid
                        label='Height'
                        type='number'
                        style={{width: "54%"}}
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.height ? true : false}
                        placeholder='Height in(cm)'
                    />

                    <Form.Input
                        name='lastSeenDateTime'
                        fluid
                        label='Last seen date and time:'
                        type='datetime-local'
                        style={{width: "100%"}}
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.lastSeenDate ? true : false}
                        placeholder='date/time'
                    />

                    <Form.Input
                        name='lastSeenLocation'
                        fluid
                        label='Last seen location:'
                        style={{width: "40%"}}
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.lastSeenLocation ? true : false}
                        placeholder='location'
                    />

                    <Form.TextArea
                        name='description'
                        label='Description'
                        style={{height: "100px"}}
                        onChange={async (e, {name, value}) => {
                            setValue(name, value);
                            await triggerValidation({name});
                        }}
                        error={errors.description ? true : false}
                        placeholder='Description'
                    />
                    <Form.Checkbox
                        name='checkBox'
                        label='I agree to the Terms and Conditions'
                        onChange={async (e, {name, checked}) => {
                            setValue(name, checked);
                            await triggerValidation({name});
                        }}
                        error={errors.checkBox ? true : false}
                    />
                    <Form.Input
                        className='submit-input'
                        type='submit'
                        style={{marginTop: "10px", width: "44%"}}
                    />
                </Grid.Column>
            </Grid>
            <Divider vertical>And</Divider>
        </Form>
    );
}

export default App;
