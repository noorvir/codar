import React from 'react';
import Page from '../components/page';
import Hero, { HeroBody } from '../components/hero';
import Container from '../components/container';
import Columns, { Column } from '../components/columns';
import ContactForm from '../components/forms/contact';


export default function Contact() {
	return (
		<Page>
			<Hero color="white" style={{ flex: 1 }}>
				<HeroBody style={{ alignItems: 'flex-start' }}>
					<Container>
						<Columns className="is-vcentered is-centered">
							<Column size={8}>
								<ContactForm />
							</Column>
						</Columns>
					</Container>
				</HeroBody>
			</Hero>
		</Page>
	);
}