import React from 'react';

import { Columns, Column } from '../columns';
import { EventManagementCard, CaseDistributionCard, CaseManagementCard } from './explain';


export default {
	title: 'Card',
	parameters: { notes: "docs" }
};


export const products = () => (
	<Columns>
		<Column>
			<EventManagementCard />
		</Column>
		<Column>
			<CaseDistributionCard />
		</Column>
		<Column>
			<CaseManagementCard />
		</Column>
	</Columns>
);