import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';
import Multiselect from '@cloudscape-design/components/multiselect';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

import * as settingOptions from '@/store/appSettings/settingOptions';
import { useAppSettingsContext } from '@/store/appSettings';
import { DEFAULT_SETTINGS } from '@/store/appSettings/defaultSettings';

import CustomNotes from './CustomNotes';

export type AppSettings = {
    'app.region': { label: string; value: string };
    'app.apiTiming': { label: string; value: string };
    'app.language': { label: string; value: string };
    'app.tags': { label: string; value: string };
};

export default function Settings() {
    const { appSettings, setAppSettings } = useAppSettingsContext();
    // Saving is instant, but create artificial wait
    const [isSaving, setIsSaving] = useState(false);
    // Make a copy of appSettings, write back it after form validation
    const [settings, setSettings] = useState<AppSettings>(appSettings);

    // Update local settings state
    function updateSettings(settingKey: string, value: string | OptionDefinition) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...{
                [settingKey]: value,
            },
        }));
    }

    // Update local settings state
    function updateTag(settingKey: string, value: string | OptionDefinition | OptionDefinition[]) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...{
                [settingKey]: value,
            },
        }));
    }

    // Reset settings to defaults, defined in consts
    function handleResetToDefaults() {
        setSettings(DEFAULT_SETTINGS);
    }

    // Reload settings from appSettings from appContext
    function handleReload() {
        setSettings(appSettings);
    }

    function handleSave() {
        setIsSaving(true);
        setTimeout(() => {
            setAppSettings(settings);
            setIsSaving(false);
            window.location.reload();
        }, 300);
    }

    // Language options
    const languageOptions = [
        { label: 'English', value: 'eng' },
        { label: 'Dutch', value: 'dutch' },
        { label: 'French', value: 'french' },
        { label: 'German', value: 'german' },
    ];

    const tagOptions = [
        {
            label: 'Chief Complaint',
            value: 'Chief Complaint',
        },
        {
            label: 'History Of Present Illness',
            value: 'History Of Present Illness',
        },
        {
            label: 'Review Of Systems',
            value: 'Review Of Systems',
        },
        {
            label: 'Past Medical History',
            value: 'Past Medical History',
        },
        {
            label: 'Assessment',
            value: 'Assessment',
        },
        {
            label: 'Plan',
            value: 'Plan',
        },
    ];

    return (
        <ContentLayout
            header={
                <Header variant="h2" description="Settings are saved locally to the browser">
                    Settings
                </Header>
            }
        >
            <Container>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <Form
                        actions={
                            <SpaceBetween direction="horizontal" size="xs">
                                <Button disabled={isSaving} formAction="none" onClick={() => handleReload()}>
                                    Reload
                                </Button>
                                <Button disabled={isSaving} variant="primary">
                                    {isSaving ? <Spinner /> : 'Save'}
                                </Button>
                            </SpaceBetween>
                        }
                        secondaryActions={
                            <Button disabled={isSaving} formAction="none" onClick={() => handleResetToDefaults()}>
                                Reset to Defaults
                            </Button>
                        }
                    >
                        <SpaceBetween size={'m'}>
                            <FormField
                                label="Custom Note Tags"
                                description="Doctor can select custom note tags available for final AI generated analysis."
                            >
                                {/* <Multiselect
                                    selectedOptions={[settings['app.tags']]}
                                    onChange={({ detail }) => {
                                        const selectedTags = detail.selectedOptions.map((option) => ({
                                            label: option.label,
                                            value: option.value,
                                        }));
                                        updateTag('app.tags', selectedTags);
                                    }}
                                    options={tagOptions}
                                    placeholder="Choose Note Tags"
                                /> */}
                                <CustomNotes />
                            </FormField>
                            <FormField label="Audio Language" description="Select your preferred language.">
                                <Select
                                    selectedOption={settings['app.language']}
                                    onChange={({ detail }) => updateSettings('app.language', detail.selectedOption)}
                                    options={languageOptions}
                                    placeholder="Choose Language"
                                />
                            </FormField>
                            <ExpandableSection headerText="Advanced">
                                <FormField
                                    label="AWS Cloud Region"
                                    description="During the public preview, AWS Cloud is available in the US East (N. Virginia) region."
                                >
                                    <Select
                                        selectedOption={settings['app.region']}
                                        onChange={({ detail }) => updateSettings('app.region', detail.selectedOption)}
                                        options={settingOptions.appRegionOptions}
                                    />
                                </FormField>
                                <FormField
                                    label="API Timing"
                                    description="Print API timing information in the browser console."
                                >
                                    <Select
                                        selectedOption={settings['app.apiTiming']}
                                        onChange={({ detail }) =>
                                            updateSettings('app.apiTiming', detail.selectedOption)
                                        }
                                        options={settingOptions.apiTimings}
                                    />
                                </FormField>
                            </ExpandableSection>
                        </SpaceBetween>
                    </Form>
                </form>
            </Container>
        </ContentLayout>
    );
}
