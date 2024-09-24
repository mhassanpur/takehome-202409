import { useForm, SubmitHandler } from "react-hook-form";
import { TeamMember, TeamMemberRole } from "../services/types";
import {
    Alert,
    Button,
    CircularProgress, 
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid2 as Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Header from "../components/Header";
import { 
    useDeleteTeamMemberMutation, 
    useGetTeamMemberQuery,
    useUpdateTeamMemberMutation
} from "../services/teamMembers";
import { useNavigate, useParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const EditPageFormSchema = yup.object().shape({
    id: yup.string().label("ID").required(),
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    phone:
        yup.string().label("Phone Number").
            matches(/^[0-9]{10}$/, "Phone number must be exactly 10 characaters (digits only)").required(),
    email: yup.string().label("Email").email().required(),
    role: yup.string().label("Role").required(),
});

type EditPageFormSchemaType = yup.InferType<typeof EditPageFormSchema>;

interface EditTeamMemberError {
    id?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    role?: string[];
}

const rootStyle = {
    height: '100vh',
    Width: '100vw',
    margin: '0px',
    padding: '0px',
};

const gridContainerStyle = {
    height: '100%',
    margin: '0px',
    padding: '0px',
};

const formStyle = {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #ddd',
};

const formSectionStyle = {
    marginTop: '16px',
};

function EditPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const { isLoading: isFetching, error: fetchError, data: teamMember } = useGetTeamMemberQuery(params.id as string);
    const [
        postUpdate,
        {
            isLoading: isSaving,
            error: saveError,
            status: saveStatus
        }
    ] = useUpdateTeamMemberMutation();
    const [
        postDelete,
        {
            isLoading: isDeleting,
            error: deleteError,
            status: deleteStatus
        }
    ] = useDeleteTeamMemberMutation();
    const buttonsDisabled = isSaving || isDeleting;

    // Use react-hook-form to set the initial values of the form
    const yupFormResolver = yupResolver<EditPageFormSchemaType>(EditPageFormSchema);
    const { register, handleSubmit, formState: { errors: clientErrors } } = useForm<EditPageFormSchemaType>({
        resolver: yupFormResolver,
        values: {
            id: teamMember?.id || '',
            firstName: teamMember?.firstName || '',
            lastName: teamMember?.lastName || '',
            phone: teamMember?.phone || '',
            email: teamMember?.email || '',
            role: teamMember?.role || TeamMemberRole.REGULAR,
        }
    });

    // Handle form submission
    const onSubmit: SubmitHandler<EditPageFormSchemaType> = (data) => {
        postUpdate(data as Partial<TeamMember>);
    };

    // Handle form errors
    const formError = saveError ? (saveError as FetchBaseQueryError).data as EditTeamMemberError : null;
    let errorMessage = formError ? "Error: Unable to save new team member!" : null;
    if (deleteError) {
        errorMessage = "Error: Unable to delete team member!";
    }

    // Form: Clicking delete
    const onClickDelete = () => {
        //postDelete(params.id as string);
        setConfirmDeletion(true);
    }

    // Delete confirmation: Clicking confirm
    const onConfirmDelete = () => {
        setConfirmDeletion(false); // clear dialog box
        postDelete(params.id as string);
    }

    // Delete confirmation: Clicking cancel
    const onCancelDelete = () => {
        setConfirmDeletion(false);
    }

    // Delete confirmation dialog box
    const deleteConfirmationDialog = (
        <ConfirmationDialog
            open={confirmDeletion}
            title="Confirm Delete"
            message={(
                <>
                    Are you sure you want to delete the user:&nbsp;
                    <strong>{teamMember?.firstName} {teamMember?.lastName}</strong>?
                </>
            )}
            cancelButton={
                <Button onClick={onCancelDelete} color="primary" variant="outlined">
                    Cancel
                </Button>
            }
            confirmButton={
                <Button onClick={onConfirmDelete} color="error" variant="contained">
                    Delete
                </Button>
            }
        />
    );

    // Redirect to the index page after saving/deleting the team member
    useEffect(() => {
        if (saveStatus === 'fulfilled' || deleteStatus === 'fulfilled') {
            navigate('/');
        }
    }, [saveStatus, deleteStatus, navigate]);

    // Handle loading and error states
    if (isFetching) {
        return (
            <Container maxWidth={false} sx={rootStyle}>
                <Grid
                    container
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={gridContainerStyle}
                >
                    <CircularProgress size={32} />
                </Grid>
            </Container>
        );
    }
    else if (fetchError) {
        return (
            <Container maxWidth={false} sx={rootStyle}>
                <Grid
                    container
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={gridContainerStyle}
                >
                    <Alert severity="error">Failed to load team member: {params.id}</Alert>
                </Grid>
            </Container>
        );
    }

    // Helper function for detecting form errors
    const hasError = (field: keyof EditPageFormSchemaType) => {
        if (formError) {
            return formError[field] !== undefined;
        }
        else if (clientErrors) {
            return clientErrors[field] !== undefined;
        }
        return false;
    };

    // Helper function for helper text
    const helperText = (field: keyof EditPageFormSchemaType) => {
        if (formError) {
            return formError[field] ? formError[field]?.[0] : "";
        }
        else if (clientErrors) {
            return clientErrors[field]?.message;
        }
        return "";
    };

    // Use react-hook-form to create a form using MUI components
    return (
        <Container>
            {deleteConfirmationDialog}
            <Header title="Edit team member" subtitle="Edit contact info, location, and role." />
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <Grid container direction={'column'} spacing={2} justifyContent={'center'}>
                    {formError && <Alert severity="error" variant="outlined">{errorMessage}</Alert>}
                    <Typography variant="h5" sx={formSectionStyle}>Info</Typography>
                    <input type="hidden" {...register("id")} />
                    <FormControl>
                        <TextField
                            {...register("firstName")}
                            variant="outlined" 
                            label="First Name"
                            aria-invalid={hasError("firstName")}
                            error={hasError("firstName")}
                            helperText={helperText("firstName")} />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...register("lastName")}
                            variant="outlined" 
                            label="Last Name"
                            aria-invalid={hasError("lastName")}
                            error={hasError("lastName")}
                            helperText={helperText("lastName")} />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...register("phone")}
                            variant="outlined" 
                            type="number"
                            label="Phone"
                            aria-invalid={hasError("phone")}
                            error={hasError("phone")}
                            helperText={helperText("phone")} />
                    </FormControl>
                    <FormControl>
                        <TextField
                            {...register("email")}
                            variant="outlined"
                            type="email"
                            label="Email"
                            aria-invalid={hasError("email")}
                            error={hasError("email")}
                            helperText={helperText("email")} />
                    </FormControl>
                    <Typography variant="h5" sx={formSectionStyle}>Role</Typography>
                    <FormControl
                        aria-invalid={hasError("role")}
                        error={hasError("role")}
                    >
                        <RadioGroup
                            row
                            name="role"
                            aria-label="role"
                            aria-describedby="role-helper-text"
                            defaultValue={teamMember?.role}>
                            <Grid container direction="column" spacing={1}>
                                <FormControlLabel
                                    value={TeamMemberRole.REGULAR}
                                    control={<Radio {...register("role")} />}
                                    label="Regular - Can't delete members" />
                                <FormControlLabel
                                    value={TeamMemberRole.ADMIN}
                                    control={<Radio {...register("role")} />}
                                    label="Admin - Can delete members" />
                            </Grid>
                        </RadioGroup>
                        <FormHelperText id="role-helper-text">{helperText("role")}</FormHelperText>
                    </FormControl>
                    <Grid container direction={'row'} justifyContent={'flex-end'}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={onClickDelete}
                            disabled={buttonsDisabled}
                        >
                            Delete
                        </Button>
                        <Button type="submit" variant="contained" disabled={buttonsDisabled}>Save</Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}

export default EditPage;