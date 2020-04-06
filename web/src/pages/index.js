import React from 'react';
import Page from '../components/page';
import Container from '../components/container';
import Hero, { HeroBody } from '../components/hero';
import Columns, { Column } from '../components/columns';
import Text from '../components/text';
import ExplainCard from '../components/card/explain';
import Button from '../components/button';
import { FaqSection, Question, Answer } from '../components/faqs';
import ContactForm from '../components/forms/contact';

const faqSections = [
	// {
	//     title: 'How does it work?',
	//     content: 'Magic!',
	//     icon: 'ios-construct',
	// },
	// {
	//     title: 'Is my data stored in the cloud?',
	//     content: 'No no no no!!',
	//     icon: 'ios-cloud'
	// },
	{
		title:
			'Welche Daten werden mit anderen geteilt, wenn ich Symptome melde?',
		content:
			'Niemand außer dir kann deine Person direkt mit deinen ' +
			'Symptomen verknüpft, da alle deine Daten lokal gehalten werden ' +
			'und du die Symptome lediglich an ein Pseudonym knüpfst. Lediglich ' +
			'wenn du einer Person an einem Ort oder Uhrzeit begegnest, bei der ' +
			'man eindeutig auf Dich schließen könnte, ist es theoretisch möglich ' +
			'bei einer Meldung auf dich zurückzuschließen. Du kannst aber ' +
			'entsprechende Kontakte bei der Meldung auch aus der Meldung ausschließen.',
		icon: 'ios-lock'
	},
	{
		title:
			'Kann ich ausschließen, infiziert zu sein, wenn mir keine ' +
			'infizierten Kontakte angezeigt wurden?',
		content:
			'Nein, die ChainBreaker App unterstützt Dich nur dabei, über ' +
			'Kontaktpersonen Bescheid zu wissen. Es gibt viele weitere ' +
			'Möglichkeiten sich zu infizieren bzw. durch das Berühren der ' +
			'gleichen Oberflächen als Infizierte. Darüber hinaus wirst du nur ' +
			'von anderen ChainBreaker-Teilnehmern gewarnt. Also Spread the word!',
		icon: 'ios-git-compare'
	},
	{
		title:
			'Wie kann ich sicher gehen, dass die App ordnungsgemäß funktioniert?',
		content:
			'Wenn du eine Benachrichtigung siehst, ist die App ordnungsgemäß ' +
			'eingerichtet und funktionstüchtig. Die App verifiziert selbstständig, ' +
			'dass Nachrichten gesendet und empfangen werden können. Darüber hinaus ' +
			'wirst du gewarnt, wenn dein Bluetooth beispielsweise ausgeschaltet ist?',
		icon: 'ios-checkmark'
	},
	{
		title:
			'Verringert die App meine Akkulaufzeit?',
		content:
			'Ja, aber nur ein bisschen. Bluetooth Low Energy heisst der ' +
			'Übertragungsstandard, den die App nutzt. Das "Low Energy" ist Programm.',
		icon: 'ios-battery-full'
	},
];

const columnSize = "is-4-fullhd is-4-widescreen is-4-desktop is-4-tablet";

export default function Home() {
	return (
		<Page>
			<Hero color="white" size="medium">
				<HeroBody>
					<Container>
						<Columns className="is-vcentered is-centered">
							<Column size={6}>
								<Columns className="is-multiline">

									<Column size={12} >
										<Text className={'is-header-title'} h1>
											Help bring the world back to its feet.
                    					</Text>
										<Text subtitle h4>
											Codar helps you trace potential contact with people who might be infected
											and lets you make informed decisions about how to protect yourself and your community.
                   						 </Text>
										<button className="button is-primary is-large is-rounded">
											<span> Get the app </span>
											<span class="icon is-small">
												<i class="fas fa-download"></i>
											</span>
											<span></span>
										</button>
									</Column>

								</Columns>
							</Column>
							<Column size={5} offset={1}>
								<img src={'/images/bluetooth.svg'} />
							</Column>
						</Columns>
					</Container>
				</HeroBody>
			</Hero>


			<Hero color="light" size="small">
				<HeroBody>
					<Columns className="is-vcentered is-centered">
						<Container>
						<Column size={12}>
							<Columns className="is-vcentered is-centered is-multiline">
								<Column size={12} className="has-text-centered is-header-title">
									<Text h3>How does it work?</Text>
								</Column>
							</Columns>
							<Columns className="is-aligned-start is-centered is-multiline">
								<Column className={columnSize}>
									<ExplainCard
										title="Bluetooth Contact Tracing"
										subtitle="When two phones come in contact, they exchange an encrypted and anonymous ID. This ID is stored locally on tour phone."
										src="/images/anonymous.png"
									/>
								</Column>
								<Column className={columnSize}>
									<ExplainCard
										title="Submit Results or Symptoms"
										subtitle="If a person self-reports as being sick, an encrypted message is sent to all the people that the person met in the previous two weeks."
										src="/images/submit.svg"
									/>
								</Column>
								<Column className={columnSize}>
									<ExplainCard
										title="Alert for Potential Encounters"
										subtitle="Your phone receives an alert of a potentially infectious encounter and presents you with a risk-score. This is all done locally on your phone!"
										src="/images/notification.png"
									/>
								</Column>
							</Columns>
						</Column>
						</Container>
					</Columns>
				</HeroBody>
			</Hero>

			<Hero color="white" size="medium">
				<HeroBody>
					<Container>
						<div id="faq"></div>
						<Columns className="is-vcentered is-centered">
							<Column size={8}>
								<Text className={'is-header-title'} h3>
									Frequently asked questions.
						    </Text>

								<FaqSection>
									{faqSections.map(section => {
										return <>
											<Question>
												{section.title}
											</Question>
											<Answer>
												{section.content}
											</Answer>
										</>
									})}
								</FaqSection>
							</Column>
						</Columns>
					</Container>
				</HeroBody>
			</Hero>

			<Hero color="light" size="medium">
				<HeroBody>
					<Container>
						<div id="contact"></div>
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