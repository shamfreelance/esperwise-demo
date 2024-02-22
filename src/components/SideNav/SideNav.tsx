// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { useNavigate } from 'react-router-dom';

import SideNavigation from '@cloudscape-design/components/side-navigation';
import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

type SideNavProps = {
    activeHref: string;
};

export default function SideNav({ activeHref }: SideNavProps) {
    const navigate = useNavigate();

    const sideNavItems: SideNavigationProps.Item[] = [
        {
            type: 'link',
            text: 'Conversations',
            href: '/conversations',
        },
        {
            type: 'link',
            text: 'New Conversation',
            href: '/new',
        },
        { type: 'divider' },
        {
            type: 'link',
            text: 'Generate Audio',
            href: '/generate',
        },
        { type: 'divider' },
        {
            type: 'link',
            text: 'Settings',
            href: '/settings',
        },
        { type: 'divider' },
        {
            type: 'link',
            text: 'EsperWise',
            href: 'https://esperwise.com',
            external: true,
        },
        {
            type: 'link',
            text: 'EsperWsie for Dutch',
            href: 'https://esperwise.com/dutch',
            external: true,
        },
        {
            type: 'link',
            text: 'EsperWise for German',
            href: 'https://esperwise.com/german',
            external: true,
        },
    ];

    return (
        <SideNavigation
            activeHref={activeHref}
            header={{ text: 'EsperWise', href: '/' }}
            items={sideNavItems}
            onFollow={(e) => {
                e.preventDefault();
                if (e.detail.external === true) {
                    window.open(e.detail.href, '_blank', 'noopener');
                    return;
                }
                navigate(e.detail.href, { relative: 'route' });
            }}
        />
    );
}
