import React from 'react';
import Page from '../components/page';
import Container from '../components/container';
import Hero, { HeroBody } from '../components/hero';
import Columns, { Column } from '../components/columns';

export default function Home() {
    return (
    <Page>
        <Hero style={{ flex: 1 }}>
            <HeroBody>
                <Container className='' style={{padding: '50px'}}>

                    <Columns className="is-vcentered is-centered">
                        <Column size={6}>
                            <Columns className="is-multiline">

                                <Column size={12}>
                                    <h2 style={{fontSize: '30Px', fontWeight: 'bold', color: '#ffce82'}}>
                                        Help bring the world back to its feet.
                                    </h2>
                                    <p style={{fontSize: '16Px'}}>
                                        Codar helps you trace potential contact with people who might be infected
                                        and lets you make informed decisions about how to protect yourself and your community.
                                    </p>

                                </Column>

                            </Columns>
                        </Column>
                        <Column size={6}>
                            <img src={'/images/cycle.svg'}/>
                        </Column>
                    </Columns>

                    <Columns className="is-vcentered is-centered">
                        <Column className="is-vcentered is-centered" size={8}>
                            <h2 style={{fontSize: '30Px', fontWeight: 'bold', textAlign: 'center'}}>Coming soon ... </h2>
                        </Column>
                    </Columns>

                </Container>
            </HeroBody>
        </Hero>
    </Page>
    );
}