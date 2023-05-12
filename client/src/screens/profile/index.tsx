import { FunctionComponent, useState } from "react";
import { useDeletePerson, useGetPerson, useSavePerson, useUpdatePerson } from "../../hooks";
import {
    Business, IconButton, CardMedia, DeleteOutline,
    Email, Phone, Save, SystemUpdate, Typography, Card,
    CardActions, Box, Female, Male, CalendarMonthIcon,
    BackButton,
    EditableTextField,
    Mode,
    Toaster
} from "../../components";
import { Person, PersonState } from "../../models";
import classes from './index.module.css';
import { ApolloError } from "@apollo/client";
interface ProfileProps {
    personId: string;
    onBackClick?: () => void | Promise<void>;

}
const editableStyles = {
    typography: classes.name
};
const textFieldStyles = { margin: '10px 25%' };
const Profile: FunctionComponent<ProfileProps> = ({ personId, onBackClick }) => {
    const data: Person = useGetPerson(personId);
    const { type } = data;
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const onError = async (error: ApolloError) => {
        setError(error.message)
    }
    const { loading: saveLoading, savePerson } = useSavePerson(onError);
    const { loading: updateLoading, updatePerson } = useUpdatePerson(onError);
    const { loading: deleteLoading, deletePerson } = useDeletePerson(onBackClick, onError);

    const onNameChange = (value: string) => {
        setName(value)
    }

    const onUpdateHandler = async () => {
        await updatePerson(data._id, name, type);
        setName('');
    }

    if (!data?._id) {
        return null;
    }
    const birthDate = new Date(data?.dob?.date);
    const enableSave = PersonState.Random === type;
    const enableDelete = PersonState.Random !== type;
    const resetError = () => setError('');
    return (<>
        <BackButton onBackClick={onBackClick} />
        <Toaster
            message={error}
            display={!!error}
            onActionClick={resetError}
            severity="error" />
        <Box width="100%" height="80%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Card className={classes.card} >
                <CardMedia
                    component="img"
                    className={classes.image_large}
                    image={data.picture.large}
                    alt="Paella dish"
                />
                <EditableTextField
                    onBlur={onNameChange}
                    textFieldStyle={textFieldStyles}
                    styles={editableStyles}
                    value={data.name}
                    children={<><Mode className={classes.icon_mode} fontSize="small" />{!!name ? name : data.name}</>} />
                <Typography
                    marginBottom={2}
                    className={classes.typography}
                    component="p"><CalendarMonthIcon fontSize="small" className={classes.icon} />
                    <Typography className={`${classes.typography} ${classes.text}`}>
                        {birthDate.toLocaleDateString()}
                    </Typography>
                </Typography>
                <Typography
                    marginBottom={2}
                    className={`${classes.typography}`}
                    component="p">{data.gender === 'female' ? <Female fontSize="small" className={classes.icon} /> : <Male fontSize="small" className={classes.icon} />}
                    <Typography className={`${classes.typography} ${classes.text}`}>
                        {data.dob.age}
                    </Typography>
                </Typography>
                <Typography
                    component="div"
                    marginBottom={2}
                >
                    <Typography
                        className={`${classes.typography}`}
                        component="p"><Business className={classes.icon} fontSize="small" />
                        <Typography className={`${classes.typography} ${classes.text}`}>
                            {data.location.street}
                        </Typography>
                    </Typography>
                    <Typography
                        paddingLeft={3.5}
                        component="p">{data.location.city}</Typography>
                    <Typography
                        paddingLeft={3.5}
                        component="p">{data.location.state}</Typography>
                </Typography>
                <Typography
                    marginBottom={2}
                    className={`${classes.typography} ${classes.contact}`}
                    component="p"><Email fontSize="small" className={classes.icon} /> {data.email}</Typography>
                <Typography
                    marginBottom={2}
                    className={`${classes.typography} ${classes.contact}`}
                    component="p"><Phone fontSize="small" className={classes.icon} /> {data.phone}</Typography>
                <CardActions className={classes.actions} >
                    {enableSave && < IconButton disabled={saveLoading} onClick={savePerson.bind(null, data)}><Save /></IconButton>}
                    <IconButton disabled={updateLoading} onClick={onUpdateHandler}><SystemUpdate /></IconButton>
                    {enableDelete && <IconButton disabled={deleteLoading} onClick={deletePerson.bind(null, data._id)}><DeleteOutline /></IconButton>}
                </CardActions>
            </Card>
        </Box >
    </>
    );
}

export default Profile;