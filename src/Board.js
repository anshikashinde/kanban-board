import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Select, MenuItem, AppBar, Toolbar, Typography, Menu, Button } from '@mui/material';
import Ticket from './Ticket';

const groupingOptions = ['Status', 'User', 'Priority'];
const orderingOptions = ['Priority', 'Title'];

function Board() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); 
  const [groupingOption, setGroupingOption] = useState(groupingOptions[0]);
  const [orderingOption, setOrderingOption] = useState(orderingOptions[0]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [displayMenuAnchor, setDisplayMenuAnchor] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        setSortedTickets(response.data.tickets);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle grouping and sorting
  useEffect(() => {
    // Logic to group and sort the tickets based on the selected options
    // Update sortedTickets state accordingly
    let sorted = [...tickets];

    if (groupingOption === 'Status') {
        let groupedByStatus = {};
        sorted.forEach(ticket => {
          if (!groupedByStatus[ticket.status]) {
            groupedByStatus[ticket.status] = [];
          }
          groupedByStatus[ticket.status].push(ticket);
        });
        setSortedTickets(groupedByStatus);
          
          
    } else if (groupingOption === 'User') {
        let groupedByUser = {};
        sorted.forEach(ticket => {
          const user = users.find(u => u.id === ticket.userId);
          if (!groupedByUser[user.name]) {
            groupedByUser[user.name] = [];
          }
          groupedByUser[user.name].push(ticket);
        });
        setSortedTickets(groupedByUser);

     } else if (groupingOption === 'Priority') {
  let groupedByPriority = Array.from({ length: 5 }, () => []);
  sorted.forEach(ticket => {
    groupedByPriority[ticket.priority].push(ticket);
  });
  setSortedTickets(groupedByPriority);    }

    // Sort logic
    sorted = sorted.sort((a, b) => {
      if (orderingOption === 'Priority') {
        return b.priority - a.priority;
      } else if (orderingOption === 'Title') {
        return a.title.localeCompare(b.title);
      }
    });

    setSortedTickets(sorted);
  }, [groupingOption, orderingOption, tickets, users]);

  const handleDisplayMenuOpen = (event) => {
    setDisplayMenuAnchor(event.currentTarget);
  };

  const handleDisplayMenuClose = () => {
    setDisplayMenuAnchor(null);
  };

  return (
    <Container sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 0, margin: 0,display: 'flex',flexDirection: 'column', alignItems: 'stretch',}}>
      <AppBar position="static" sx={{ backgroundColor: 'white', minHeight: '50px' }}>
        <Toolbar>
        <div style={{ border: '1px solid grey', padding: '1px', borderRadius: '4px', marginRight: '5px' }}>
          <Button
            aria-controls="display-menu"
            aria-haspopup="true"
            onClick={handleDisplayMenuOpen}
            sx={{ color: 'grey' }}
          >
            Display
          </Button>
          </div>
          <Menu
            id="display-menu"
            anchorEl={displayMenuAnchor}
            keepMounted
            open={Boolean(displayMenuAnchor)}
            onClose={handleDisplayMenuClose}
          >
            <MenuItem>
              <Select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
                {groupingOptions.map(option => (
                  <MenuItem key={option} value={option}>
                    Grouping: {option}
                  </MenuItem>
                ))}
              </Select>
            </MenuItem>
            <MenuItem>
              <Select value={orderingOption} onChange={(e) => setOrderingOption(e.target.value)}>
                {orderingOptions.map(option => (
                  <MenuItem key={option} value={option}>
                    Ordering: {option}
                  </MenuItem>
                ))}
              </Select>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '20px', marginLeft:'0px' }}>
      <Grid container spacing={2}>
          {sortedTickets.map(ticket => (
            <Grid item key={ticket.id} xs={12} sm={6} md={4} lg={3} xl={2} style={{ flexBasis: '20%' }}>
              <Ticket ticket={ticket} />
            </Grid>
          ))}
        </Grid>



      </div>
    </Container>
  );
}

export default Board;
