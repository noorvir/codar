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

const columnSize = "is-2-fullhdz is-3-widescreen is-3-desktop is-3-tablet";

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
										<Button primary large>Get the app</Button>
									</Column>

								</Columns>
							</Column>
							<Column size={5} offset={1}>
								<img src={'/images/bluetooth.png'} />
							</Column>
						</Columns>
					</Container>
				</HeroBody>
			</Hero>


			<Hero color="light" size="small" className=" is-colorized-on-hover">
				<HeroBody>
					<Columns className="is-vcentered is-centered">
						<Container>
						<Column size={12}>
							<Columns className="is-vcentered is-centered is-multiline">
								<Column size={12} className="has-text-centered is-header-title">
									<Text h3>How does it work?</Text>
								</Column>
							</Columns>
							<Columns>
								<Column className={columnSize}>
									<ExplainCard
										title="Contact tracing using Bluetooth"
										subtitle="Two phones that come into close contact exchange anonymous identifiers using bluetooth low energy. The phones log the encounter along side a duration and the closest distance measured. The data stays on the phone until test results are submitted."
										src="/images/anonymous.png"
									/>
								</Column>
								<Column className={columnSize}>
									<ExplainCard
										title="Submission of test results or symptoms"
										subtitle="If a person shows symptoms they can report them in the app along side with potential test results. All locally stored encounters are then published to a public database."
										src="/images/submit.png"
									/>
								</Column>
								<Column className={columnSize}>
									<ExplainCard
										title="Alert system for dangerous encounters"
										subtitle="If a person has had a potentially infectious encounter, they get a notification via codar. This happens while maintaining the privacy of both parties involved."
										src="/images/notification.png"
									/>
								</Column>
								<Column className={columnSize}>
									<ExplainCard
										title="Self isolate advice"
										subtitle="If you get an alert for a potentially infectious encounter you should self isolate for at least 14 days."
										src="/images/isolate.png"
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

			<Hero color="light" size="small">
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