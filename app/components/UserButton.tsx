import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Popover,
  Button,
} from "@mantine/core";
import { signOut } from "next-auth/react";
import { IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
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
    <Popover width={200} position="right" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton className={classes.user} {...others}>
          <Group>
            <Avatar
              src={image}
              radius="xl"
              imageProps={{ referrerpolicy: "no-referrer" }}
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
          </Group>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Button
          fullWidth
          variant="default"
          color="gray"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}
