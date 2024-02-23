import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Input from '@cloudscape-design/components/input';
import RadioGroup from '@cloudscape-design/components/radio-group';
import TextContent from '@cloudscape-design/components/text-content';
// Import Select component
import Select from '@cloudscape-design/components/select';

import styles from './NewConversation.module.css';
import { AudioDetails, AudioSelection } from './types';

type InputNameProps = {
    jobName: string;
    setJobName: React.Dispatch<React.SetStateAction<string>>;
};
export function InputName({ jobName, setJobName }: InputNameProps) {
    return (
        <FormField
            label="Job name"
            description="The name can be up to 200 characters long. Valid characters are a-z, A-Z, 0-9, . (period), _ (underscore), and – (hyphen)."
        >
            <Input onChange={({ detail }) => setJobName(detail.value)} placeholder="Name" value={jobName} />
        </FormField>
    );
}


type InputLanguageProps = {
    inputLanguage: string;
    setInputLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export function InputLanguage({ inputLanguage, setInputLanguage }: InputLanguageProps) {
    return (
        <FormField
            label="Input language"
            description="Select the language of the input audio."
        >
            <Select
                inputLanguage={inputLanguage}
                onChange={({ detail }) => setInputLanguage(detail.inputLanguage)}
                options={[
                    { value: 'en-US', label: 'English (US)' },
                    { value: 'nl-NL', label: 'Dutch (Netherland)' },
                    { value: 'es-ES', label: 'Spanish (Spain)' },
                    { value: 'fr-FR', label: 'French (France)' },
                ]}
            />
        </FormField>
    );
}

type AudioIdentificationTypeProps = {
    audioSelection: AudioSelection;
    setAudioSelection: React.Dispatch<React.SetStateAction<AudioSelection>>;
};
export function AudioIdentificationType({ audioSelection, setAudioSelection }: AudioIdentificationTypeProps) {
    return (
        <FormField
            label="Audio identification type"
            description="Choose to split multi-channel audio into separate channels for transcription, or partition speakers in the input audio."
        >
            <div>
                <RadioGroup
                    onChange={({ detail }) => setAudioSelection(detail.value)}
                    value={audioSelection}
                    items={[
                        {
                            value: 'speakerPartitioning',
                            label: 'Speaker partitioning',
                            description:
                                'Use this option if you want to identify multiple speakers in one audio channel.',
                        },
                        {
                            value: 'channelIdentification',
                            label: 'Channel identification',
                            description:
                                'Use this option if you want to identify speakers from audio containing two channels.',
                        },
                    ]}
                />
            </div>
        </FormField>
    );
}

type AudioDetailSettingsProps = {
    audioSelection: AudioSelection;
    audioDetails: AudioDetails;
    setAudioDetails: React.Dispatch<React.SetStateAction<AudioDetails>>;
};
export function AudioDetailSettings({ audioSelection, audioDetails, setAudioDetails }: AudioDetailSettingsProps) {
    if (audioSelection === 'speakerPartitioning') {
        return (
            <FormField
                description="Providing the number of speakers can increase the accuracy of your results."
                label={<TextContent>Maximum number of speakers</TextContent>}
                constraintText="The maximum number of speakers is 10."
                errorText={
                    (audioDetails.speakerPartitioning.maxSpeakers < 2 ||
                        audioDetails.speakerPartitioning.maxSpeakers > 10) &&
                    'Invalid number of speakers.'
                }
            >
                <div className={styles.numberOfSpeakersInput}>
                    <Input
                        onChange={({ detail }) =>
                            setAudioDetails((prevDetails) => {
                                return {
                                    ...prevDetails,
                                    speakerPartitioning: {
                                        maxSpeakers: parseInt(detail.value),
                                    },
                                };
                            })
                        }
                        value={audioDetails.speakerPartitioning.maxSpeakers.toString()}
                        inputMode="numeric"
                        type="number"
                    />
                </div>
            </FormField>
        );
    } else if (audioSelection === 'channelIdentification') {
        return (
            <FormField
                description="Select which persona is on a two channel audio file."
                label={<TextContent>Map channels</TextContent>}
            >
                <Grid gridDefinition={[{ colspan: 3 }, { colspan: 3 }]}>
                    <TextContent>
                        <p>
                            <strong>Channel 1</strong>
                        </p>
                        <RadioGroup
                            onChange={({ detail }) =>
                                setAudioDetails((prevDetails) => {
                                    return {
                                        ...prevDetails,
                                        channelIdentification: {
                                            channel1: detail.value,
                                        },
                                    };
                                })
                            }
                            value={audioDetails.channelIdentification.channel1}
                            items={[
                                {
                                    value: 'CLINICIAN',
                                    label: 'Clinician',
                                },
                                {
                                    value: 'PATIENT',
                                    label: 'Patient',
                                },
                            ]}
                        />
                    </TextContent>
                    <TextContent>
                        <Box textAlign="center">
                            <p>
                                <strong>Channel 2</strong>
                            </p>
                            <p>
                                {audioDetails.channelIdentification.channel1 === 'CLINICIAN' ? 'Patient' : 'Clinician'}
                            </p>
                        </Box>
                    </TextContent>
                </Grid>
            </FormField>
        );
    } else {
        return null;
    }
}