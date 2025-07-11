import { useState } from 'react';
// Navigation component used in a Vite environment (no Next.js routing)
import {
  IconSparkles,
  IconPlug,
  IconSettings,
  IconMessages,
  IconUsers,
  IconBuildingStore,
  IconActivity,
  IconMessage2,
  IconApps,
} from '@tabler/icons-react';
import type { Icon as TablerIcon } from '@tabler/icons-react';
import { SegmentedControl, Collapse, Text } from '@mantine/core';
import classes from './NavbarSegmented.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: TablerIcon;
  submenu?: NavItem[];
}

const tabs: Record<'intelligence' | 'relationship', NavItem[]> = {
  intelligence: [
    { id: 'enrichment', label: 'Enrichment', icon: IconSparkles },
    { id: 'integrations', label: 'Integrations', icon: IconPlug },
    { id: 'settings', label: 'Settings', icon: IconSettings },
  ],
  relationship: [
    {
      id: 'messages',
      label: 'Messaging',
      icon: IconMessages,
      submenu: [
        { id: 'inbox', label: 'Inbox', icon: IconMessage2 },
        { id: 'sequences', label: 'Sequences', icon: IconActivity },
      ],
    },
    { id: 'contacts', label: 'Contacts', icon: IconUsers },
    { id: 'companies', label: 'Companies', icon: IconBuildingStore },
    { id: 'workflows', label: 'Workflows', icon: IconApps },
  ],
};

interface NavbarSegmentedProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function NavbarSegmented({ active, onNavigate }: NavbarSegmentedProps) {
  const [section, setSection] = useState<'intelligence' | 'relationship'>('intelligence');
  const [openSub, setOpenSub] = useState<string | null>(null);

  const items = tabs[section].map((item) => {
    const Icon = item.icon;

    if (item.submenu) {
      const opened = openSub === item.label;
      return (
        <div key={item.label}>
          <button
            className={classes.link}
            data-active={opened || undefined}
            onClick={() => setOpenSub(opened ? null : item.label)}
          >
            <Icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
          </button>
          <Collapse in={opened} className={classes.subMenu}>
            {item.submenu.map((sub) => {
              const SubIcon = sub.icon;
              return (
                <button
                  key={sub.label}
                  className={classes.subLink}
                  data-active={sub.id === active || undefined}
                  onClick={() => {
                    onNavigate(sub.id);
                  }}
                >
                  <SubIcon className={classes.linkIcon} stroke={1.5} />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </Collapse>
        </div>
      );
    }

    return (
      <button
        key={item.label}
        className={classes.link}
        data-active={item.id === active || undefined}
        onClick={() => onNavigate(item.id)}
      >
        <Icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </button>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          influence@mate.dev
        </Text>
        <SegmentedControl
          value={section}
          onChange={(value) => setSection(value as 'intelligence' | 'relationship')}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Intelligence Hub', value: 'intelligence' },
            { label: 'Relationship Suite', value: 'relationship' },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{items}</div>
    </nav>
  );
}
