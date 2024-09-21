import { useForm, SubmitHandler } from "react-hook-form";
import { TeamMember, TeamMemberRole } from "../services/types";
import {
    Alert,
    Button,
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
import Header from "../components/Header";
import { useAddTeamMemberMutation } from "../services/teamMembers";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddPageFormSchema = yup.object().shape({
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    phone:
        yup.string().label("Phone Number").
            matches(/^[0-9]{10}$/, "Phone number must be exactly 10 characaters (digits only)").required(),
    email: yup.string().label("Email").email().required(),
    role: yup.string().label("Role").required(),
});

type AddPageFormSchemaType = yup.InferType<typeof AddPageFormSchema>;

interface AddTeamMemberError {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    role?: string[];
}

const formStyle = {
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #ddd",
};

const formSectionStyle = {
    marginTop: "16px",
};

function AddPage() {
    const navigate = useNavigate();
    const yupFormResolver = yupResolver<AddPageFormSchemaType>(AddPageFormSchema)
    const {
        register,
        handleSubmit,
        formState: { errors: clientErrors }
    } = useForm<AddPageFormSchemaType>({ resolver: yupFormResolver });
    const [postAdd, { isLoading: isSaving, error: mutationError, status }] = useAddTeamMemberMutation();
    const onSubmit: SubmitHandler<AddPageFormSchemaType> = (data) => {
        postAdd(data as Partial<TeamMember>);
    };
    const formError = mutationError ? (mutationError as FetchBaseQueryError).data as AddTeamMemberError : null;
    const errorMessage = formError ? "Error: Unable to save new team member!" : null;

    // Redirect to the index page after saving the new team member
    useEffect(() => {
        if (status === "fulfilled") {
            navigate("/");
        }
    }, [status, navigate]);

    // Helper function for detecting form errors
    const hasError = (field: keyof AddPageFormSchemaType) => {
        if (formError) {
            return formError[field] !== undefined;
        }
        else if (clientErrors) {
            return clientErrors[field] !== undefined;
        }
        return false;
    };

    // Helper function for helper text
    const helperText = (field: keyof AddPageFormSchemaType) => {
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
            <Header title="Add a team member" subtitle="Set email, location, and role." />
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <Grid container direction={"column"} spacing={2} justifyContent={"center"}>
                    {formError && <Alert severity="error" variant="outlined">{errorMessage}</Alert>}
                    <Typography variant="h5" sx={formSectionStyle}>Info</Typography>
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
                            aria-label="Role"
                            aria-describedby="role-helper-text"
                            defaultValue={TeamMemberRole.REGULAR}>
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
                    <Grid container direction={"row"} justifyContent={"flex-end"}>
                        <Button type="submit" variant="contained" disabled={isSaving}>Save</Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}

export default AddPage;