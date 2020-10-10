import React, { useState, useEffect } from "react";
import './style.css';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#1cd0c5'
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}
function Tickets(props) {
    
    const { match: { params } } = props
    const [showBackDoor, setShowBackDoor] = useState(false);

    const [ticketList, setTicketList] = useState([])

    const [showNotification, setShowNotification] = useState(false);
    const [status, setStatus] = useState('error');
    const [message, setMessage] = useState('');
    const [openTicket, setOpenTicket] = useState('0');
    const [scroll, setScroll] = React.useState('paper');
    const [values, setValues] = useState({
        query: undefined
    });
    const [statusShow, setStatusShow] = useState(0);
    const showResultServer = (message, status) => {
        setStatus(status);
        setMessage(message);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000)
    }
    const listTickets = (page, isOpen, query) => {
        setShowBackDoor(true);
        setShowBackDoor(false);
        // api.listTickets().then(res => {

        // }).catch(err => {
        //     setShowBackDoor(false);
        //     if (err.response) {
        //         showResultServer(err.response.data.message, 'error')
        //     } else {
        //         showResultServer('خطا', 'error')
        //         console.log(err)
        //     }
        // })
    }
    useEffect(() => {
        listTickets()
    })

    return (
        <div className="containerAll">
            
        </div>
    )
}
export default Tickets;
