import React from "react";
import { createEditor, Node, Transforms, Editor, Text, Range, Point } from "slate";

import {
  Popper,
  PopperProps,
  ButtonGroup,
  IconButton,
  Input,
} from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Link,
  Close,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.black,
  },
  button: {
    color: theme.palette.common.white,
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    color: theme.palette.common.white,
    padding: theme.spacing(0.25, 1),
  },
  close: {
    opacity: 0.75,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
}));

export interface ToolbarProps extends Omit<PopperProps, "children"> {
  editor: any;
  toggleMark: any;
}

export function Toolbar(props: ToolbarProps) {
  const [link, setLink] = React.useState(null);
  const s = useStyles();
  const { editor, toggleMark } = props;

  // const editorSlate = useSlate();
  return (
    <Popper className={s.root} {...props}>
      {link === null ? (
        /* Formatting controls */
        <ButtonGroup variant="text" color="primary">
          <IconButton
            className={s.button}
            size="small"
            onClick={() => {
              console.log(editor, 55)
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: n => Text.isText(n), split: true }
              )
            }}
          >
            <FormatBold fontSize="small" />
          </IconButton>
          <IconButton className={s.button} size="small">
            <FormatItalic fontSize="small" />
          </IconButton>
          <IconButton className={s.button} size="small">
            <FormatUnderlined fontSize="small" />
          </IconButton>
          <IconButton
            className={s.button}
            size="small"
            onClick={() => console.log("212")}
          >
            <Link fontSize="small" />
          </IconButton>
        </ButtonGroup>
      ) : (
        /* URL input field */
        <form onSubmit={x => x.preventDefault()}>
          <Input
            className={s.input}
            type="url"
            value={link}
            //onChange={x => setLink(x.target.value)}
            endAdornment={
              <Close
                className={s.close}
                fontSize="small"
                onClick={() => setLink(null)}
              />
            }
            placeholder="https://"
            disableUnderline
            fullWidth
            autoFocus
          />
        </form>
      )}
    </Popper>
  );
}
