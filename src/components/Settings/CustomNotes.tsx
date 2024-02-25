// import * as React from 'react';

// import Multiselect from '@cloudscape-design/components/multiselect';

// interface OptionDefinition {
//     label: string;
//     value: string;
// }

// export default function CustomNotes() {
//     const [selectedOptions, setSelectedOptions] = React.useState<OptionDefinition[]>([
//         {
//             label: 'History Of Present Illness',
//             value: 'History Of Present Illness',
//         },
//     ]);

//     return (
//         <Multiselect
//             selectedOptions={selectedOptions}
//             onChange={({ detail }) => {
//                 // Create a mutable copy of the selected options before setting state
//                 setSelectedOptions([...detail.selectedOptions]);
//             }}
//             options={[
//                 {
//                     label: 'Chief Complaint',
//                     value: 'Chief Complaint',
//                 },
//                 {
//                     label: 'History Of Present Illness',
//                     value: 'History Of Present Illness',
//                 },
//                 {
//                     label: 'Review Of Systems',
//                     value: 'Review Of Systems',
//                 },
//                 {
//                     label: 'Past Medical History',
//                     value: 'Past Medical History',
//                 },
//                 {
//                     label: 'Assessment',
//                     value: 'Assessment',
//                 },
//                 {
//                     label: 'Plan',
//                     value: 'Plan',
//                 },
//             ]}
//             placeholder="Choose options"
//         />
//     );
// }
