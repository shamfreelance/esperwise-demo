import * as React from 'react';

import Multiselect from '@cloudscape-design/components/multiselect';

export default function CustomNotes() {
    const [selectedOptions, setSelectedOptions] = React.useState([
        {
            label: 'History Of Present Illness',
            value: 'History Of Present Illness',
        },
    ]);
    return (
        <Multiselect
            selectedOptions={selectedOptions}
            onChange={({ detail }) => setSelectedOptions(detail.selectedOptions)}
            options={[
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
            ]}
            placeholder="Choose options"
        />
    );
}
