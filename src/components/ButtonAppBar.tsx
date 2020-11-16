import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
  
                    <Typography variant="h6" className={classes.title}>
                        Pokemon Party Manager
                    </Typography>

                    {/* <Link to="/test/charles">
                        <Button>Charles</Button>
                    </Link>

                    <Link to="/test/larry">
                        <Button>Larry</Button>
                    </Link>

                    <Link to="/test/eldon">
                        <Button>Eldon</Button>
                    </Link>

                    <Link to="/test/jammie">
                        <Button>Jammie</Button>
                    </Link> */}
                    <Link to="/components/Login">
                        <Button>Login</Button>
                    </Link>
                    <Link to="/components/Signup">
                        <Button>Signup</Button>
                    </Link>
                    <Link to="/components/HomeView">
                        <Button>Home</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    );
}
