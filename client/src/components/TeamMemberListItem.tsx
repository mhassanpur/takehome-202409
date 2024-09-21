import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { TeamMember, TeamMemberRole } from '../services/types';
import { Person } from '@mui/icons-material';

export interface TeamMemberListItemProps {
    teamMember: TeamMember;
    onClick?: (teamMember: TeamMember) => void;
}

const rootStyle = {
    '&:first-of-type': {
        borderTop: '1px solid #ddd',
    },
    borderBottom: '1px solid #ddd',
};

function TeamMemberListItem({ teamMember, onClick }: TeamMemberListItemProps) {
    // Format team member name with role (if admin)
    let teamMemberName = `${teamMember.firstName} ${teamMember.lastName}`;
    if (teamMember.role === TeamMemberRole.ADMIN) {
        teamMemberName += ' (admin)';
    }
    // Format phone number: xxx-xxx-xxxx
    const formattedPhone = teamMember.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return (
        <ListItemButton onClick={() => onClick && onClick(teamMember)} sx={rootStyle}>
            <ListItemAvatar>
                <Avatar>
                    <Person />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${teamMemberName}`} secondary={
                <>
                    {formattedPhone}
                    <br />
                    {teamMember.email}
                </>
            } />
        </ListItemButton>
    );
}

export default TeamMemberListItem;