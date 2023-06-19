import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Button,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { redirect } from "next/dist/server/api-utils";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    border: "1px solid",
    borderColor: "#eaecef",
    borderRadius: "4px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar
          imageProps={{ referrerpolicy: "no-referrer" }}
          src={image}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={600}>
            {name}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
