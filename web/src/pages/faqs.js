import React from 'react';
import Page from '../components/page';
import Hero, { HeroBody } from '../components/hero';
import Container from '../components/container';
import Columns, { Column } from '../components/columns';
import { FaqSection, Question, Answer } from '../components/faqs';
import Text from '../components/text';


function QA(){
	return (
		<Container>
			<FaqSection>
				<Question>
					What is codar?
				</Question>
				<Answer>
					codar is a COVID-19 contact tracing app.
				</Answer>
			</FaqSection>

		</Container>
	)
}

export default function Faqs({ location }) {
	return (
		<Page>
			<Hero color="white" s style={{ flex: 1 }}>
				<HeroBody style={{ alignItems: 'flex-start' }}>
					<Container>
						<Columns className="is-vcentered is-centered">
							<Column size={8}>
								<Text h3>
									Frequently asked questions.
								</Text>

								<QA/>

							</Column>
						</Columns>
					</Container>
				</HeroBody>
			</Hero>
		</Page>
	)
}