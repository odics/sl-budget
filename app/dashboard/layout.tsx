"use client";

import { AppShell, Navbar, Header } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "../components/ui/Loading";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useState } from "react";

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
  MediaQuery,
  Burger,
  useMantineTheme,
  Text,
  NavLink,
  Popover,
} from "@mantine/core";
import {
  IconDashboard,
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconLogout,
  IconUserEdit,
  IconArrowsTransferDown,
} from "@tabler/icons-react";

import { LinksGroup } from "../components/ui/NavbarLinksGroup";
import { Logo } from "../components/ui/Logo";
import { UserButton } from "../components/UserButton";
// import { redirect } from "next/dist/server/api-utils";

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
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  {
    label: "User Settings",
    icon: IconUserEdit,
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

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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

  if (status === "unauthenticated") {
    return redirect("/");
  }

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          // backgroundImage:
          //   theme.colorScheme === "dark"
          //     ? "url(_next/static/media/bg-dark.3b408c81.jpg)"
          //     : theme.colors.gray[0],
          backgroundSize: "cover",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
        >
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <NavLink
              label="Dashboard"
              icon={
                <IconDashboard size={24} strokeWidth={2} color={"#762d86"} />
              }
            />
            <NavLink
              label="Analytics"
              icon={
                <IconPresentationAnalytics
                  size={24}
                  strokeWidth={2}
                  color={"#762d86"}
                />
              }
            />
            <NavLink
              label="Transactions"
              icon={
                <IconArrowsTransferDown
                  size={24}
                  strokeWidth={2}
                  color={"#762d86"}
                />
              }
            />
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
            <UserButton {...userAttributes} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text>Logo</Text>
            </Group>

            <ThemeToggle />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
