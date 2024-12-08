import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

/** Parameters passed to the list items */
interface IDrawerListItemProps {
  /** Display text */
  text: string;

  /** The icon to present in the item */
  icon: React.ReactNode;

  /** The URL where to redirect when clicked */
  link: string;
}

/** Reusable list item for the drawer */
export const DrawerListItem = (props: IDrawerListItemProps) => {
  return (
    <ListItem disablePadding component="a" href={props.link}>
      <ListItemButton>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
