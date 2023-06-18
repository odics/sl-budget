"use client";

import { AppShell, Navbar, Header } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

import {
  Group,
  Box,
  ThemeIcon,
  Code,
  ScrollArea,
  createStyles,
  rem,
  Button,
  UnstyledButton,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconLogout,
} from "@tabler/icons-react";

import { LinksGroup } from "./ui/NavbarLinksGroup";
import { Logo } from "./ui/Logo";
import { UserButton } from "./UserButton";

const mockdata = [
  { label: "Budget Dashboard", icon: IconGauge },
  {
    label: "Your Budgets",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Home Budget", link: "/" },
      { label: "House Savings", link: "/" },
      { label: "Trip Planning", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "User Settings",
    icon: IconLock,
    link: "/",
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  header: {
    padding: 0,
    paddingTop: 0,
    paddingLeft: 10,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function Dashboard() {
  const { data: session, status } = useSession();
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const userAttributes = {
    name: session?.user?.name ?? "Username",
    image: session?.user?.image ?? "image",
    email: session?.user?.email ?? "email",
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          height={800}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>
              {links}
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  signOut();
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ThemeIcon variant="light" size={30}>
                    <IconLogout size={"1.1rem"} />
                  </ThemeIcon>
                  <Box ml="md">Logout</Box>
                </Box>
              </UnstyledButton>
            </div>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} pl="xl" pr="xl">
          <Group position="apart" sx={{ height: "100%" }} p={0}>
            SL Budget
            <Group spacing="sm">
              <UserButton {...userAttributes} />
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Button>Hwl</Button>
    </AppShell>
  );
}
