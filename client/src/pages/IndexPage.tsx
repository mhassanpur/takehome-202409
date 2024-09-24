import React from "react";
import { Alert, CircularProgress, Container, Grid2 as Grid, List, Pagination } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetTeamMembersQuery } from "../services/teamMembers";
import Header from "../components/Header";
import TeamMemberListItem from "../components/TeamMemberListItem";

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

function IndexPage() {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);

    // Use the `useGetTeamMembersQuery` hook to fetch the team members from the API
    // The `data` property of the `response` object contains the team members
    const limit = 10;
    const offset = (page - 1) * limit;
    const { data, error, isLoading } = useGetTeamMembersQuery({ limit: limit, offset: offset });

    // Calculate pagination values
    const totalMembers = data?.count;
    const totalPages = totalMembers ? Math.ceil(totalMembers / limit) : 1;
    const currentPage = page;
    const teamMembers = data?.results;

    const onClickAdd = () => {
        // Navigate to the add page
        navigate('/add');
    };

    const onClickEdit = (teamMemberId: string) => {
        // Navigate to the edit page
        navigate(`/edit/${teamMemberId}`);
    };

    const onClickPage = (newPage: number) => {
        setPage(newPage);
    };

    // Handle loading and error states
    if (isLoading) {
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
    else if (error) {
        return (
            <Container maxWidth={false} sx={rootStyle}>
                <Grid
                    container
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={gridContainerStyle}
                >
                    <Alert severity="error">Failed to load team members</Alert>
                </Grid>
            </Container>
        );
    }

    const pagination = (
        <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, newPage) => onClickPage(newPage)} />
        </Grid>
    )

    let subtitle = "You have no team members yet.";
    if (totalMembers) {
        if (totalMembers > 1) {
            subtitle = `You have ${totalMembers} team members.`;
        }
        else {
            subtitle = "You have 1 team member.";
        }
    }
    return (
        <Container>
            <Header
                title={'Team members'}
                subtitle={subtitle}
                buttonIcon={<Add />}
                onButtonClick={onClickAdd}
            />
            <List>
                {teamMembers?.map((teamMember) => (
                    <TeamMemberListItem
                        key={teamMember.id}
                        teamMember={teamMember}
                        onClick={() => onClickEdit(teamMember.id)}
                    />
                ))}
            </List>
            {pagination}
        </Container>
    );
}

export default IndexPage;