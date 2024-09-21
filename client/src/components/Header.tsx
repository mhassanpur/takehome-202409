import { Button, Grid2, Typography } from "@mui/material";

export interface HeaderProps {
    title: string;
    subtitle: string;
    buttonIcon?: React.ReactNode;
    onButtonClick?: () => void;
}

const rootStyle = {
    margin: '8px',
    marginBottom: '24px',
}

function Header({ title, subtitle, buttonIcon, onButtonClick }: HeaderProps) {
    const button = buttonIcon && onButtonClick && (
        <Grid2 container direction="column" justifyContent="center">
            <Button variant="text" color="primary" size="large" onClick={onButtonClick}>
                {buttonIcon}
            </Button>
        </Grid2>
    );
    return (
        <Grid2 container direction="row" alignItems="center" justifyContent="center" sx={rootStyle}>
            <Grid2 container flexGrow={1} direction="column" justifyContent="center">
                <Typography variant="h3" className="pageHeader">{title}</Typography>
                <Typography variant="h5" className="pageHeader">{subtitle}</Typography>
            </Grid2>
            {button}
        </Grid2>
    );
}

export default Header;