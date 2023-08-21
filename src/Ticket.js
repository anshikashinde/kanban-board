import React from 'react';
import { Card, CardContent, Typography, Avatar, Radio } from '@mui/material';
import { styled } from '@mui/system';

const CustomCard = styled(Card)({
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
});

const AvatarContainer = styled('div')({
  position: 'absolute',
  top: '8px',
  right: '8px',
});

const FeatureLabel = styled('div')({
  position: 'absolute',
  bottom: '8px',
  left: '8px',
  fontSize: '10px',
  color: 'grey',
  border: '1px solid grey',
  padding: '2px',
  borderRadius: '4px',
});

const TitleRadioContainer = styled('div')({
  display: 'flex',
  alignItems: 'center', // Align radio button and title vertically
});

const TitleRadio = styled(Radio)({
  fontSize: '13px',
  marginRight: '-3px', // Added margin to create spacing between radio and title
  marginLeft: '-20px', // Adjust the radio's left margin
});

function Ticket({ ticket }) {
  return (
    <CustomCard>
      <AvatarContainer>
        <Avatar style={{ width: '24px', height: '24px' }}>{ticket.userInitials}</Avatar>
      </AvatarContainer>
      <CardContent>
        <TitleRadioContainer>
          <TitleRadio value={ticket.id} color="primary" size="small" />
          <Typography variant="body2" style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>{ticket.title}</Typography>
        </TitleRadioContainer>
      </CardContent>
      <FeatureLabel>{ticket.tag}</FeatureLabel>
    </CustomCard>
  );
}

export default Ticket;
