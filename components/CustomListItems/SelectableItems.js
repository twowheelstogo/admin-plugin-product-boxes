import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import RenderMedia from './RenderMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    width: "40px"
  },
  text: {
    paddingLeft: theme.spacing(1)
  }
}));

function SelectableItems(props) {
  const classes = useStyles();
  const { checked, setChecked } = props;
  const { products } = props;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value._id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      {(products).map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;

        return (
          <ListItem key={value._id} button onClick={handleToggle(value)}>
            <ListItemAvatar className={classes.media}>
              <RenderMedia
                media={value.media}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value.title} className={classes.text} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value._id) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

SelectableItems.propTypes = {
  products: PropTypes.array
}

export default SelectableItems;
