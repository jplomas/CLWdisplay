import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { Bert } from 'meteor/themeteorchef:bert'
import './main.html'

Template.hello.onRendered(() => {
  Session.set('status', 'not connected')
})

Template.hello.helpers({
  status() {
    return Session.get('status')
  },
  token() {
    return Session.get('token')
  },
})

Template.ITU.helpers({
  consultant() {
    return Session.get('ICUdayCons')
  },
  registrar() {
    return Session.get('ICUdayReg')
  },
})

Template.ITU.events({
  'click #hmni': () => {
    $('#CLWheading').toggle()
  },
})

Template.hello.events({
  'click #connect': () => {
    Meteor.call('login', (err, res) => {
      if (err) {
        console.log(err)
        Session.set('status', `FAIL: ${err.reason}. Please try again in 5 minutes. `)
        Bert.alert(`There was a problem [${err.reason}]. Please try again in 5 minutes.`, 'danger', 'growl-top-right')
        Session.set('token', null)
      } else {
        console.log(res)
        let xml = res.content
        xml = xml.replace(/↵/g, '')
        Meteor.call('parseXML', xml, (error, result) => {
          if (error) {
            console.log(error)
            Session.set('status', `FAIL: ${err.reason}. Please try again in 5 minutes. `)
            Session.set('token', null)
          } else {
            console.log(result.auth.token)
            Session.set('status', 'SUCCESS')
            Session.set('token', result.auth.token)
          }
        })
      }
    })
  },

  'click #getICU': () => {
    const apiToken = Session.get('token')
    if (apiToken) {
      Meteor.call('ICU', apiToken, (err, res) => {
        if (err) {
          console.log(err)
          Bert.alert(`CLWrota reported an error [${err.reason}]`, 'danger', 'growl-top-right')
        } else {
          console.log(res)
          let xml = res.content
          xml = xml.replace(/↵/g, '')
          Meteor.call('parseXML', xml, (e, r) => {
            if (e) {
              console.log(e)
            } else {
              console.log(r)
              // Session.set('status', `SUCCESS: ${r.auth.token}`)
            }
          })
        }
      })
    } else {
      console.log('Token invalid')
      Bert.alert('Not connected to the CLWrota server', 'danger', 'growl-top-right')
    }
  },

  'click #test': () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?><stream>    <summary>        <api_call>            <![CDATA[/b2432f82-8f8c-4b1d-9355-2894d340e468/date/2017-10-21/oncalls/]]>        </api_call>        <type>locations</type>        <date>2017-10-21</date>        <rotastatus>published</rotastatus>        <version>1 beta (for CLWRota 70.21)</version>    </summary>    <locations>        <location name="ICU on call" uuid="55f9053d-37d4-4dc4-a35e-3e1a54588553">                <node>                <date>2017-10-21</date>                <session>am</session>                <revision>2</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>1.38</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>ca49c6da-ecde-491f-8cea-9cdecd669482</uuid>                        <name><![CDATA[Lucy BATES]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07765405987]]></contact>                        <email><![CDATA[lucy@familybates.plus.com]]></email>                    </member>                    <member>                        <uuid>ae696838-4229-4dd8-994d-ad3ee78e4cde</uuid>                        <name><![CDATA[Simon Bluhm]]></name>                        <role>trainee</role>                        <grade>ST4</grade>                        <contact><![CDATA[07707911707]]></contact>                        <email><![CDATA[simon.bluhm@gmail.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>pm</session>                <revision>2</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>1.38</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>ca49c6da-ecde-491f-8cea-9cdecd669482</uuid>                        <name><![CDATA[Lucy BATES]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07765405987]]></contact>                        <email><![CDATA[lucy@familybates.plus.com]]></email>                    </member>                    <member>                        <uuid>ae696838-4229-4dd8-994d-ad3ee78e4cde</uuid>                        <name><![CDATA[Simon Bluhm]]></name>                        <role>trainee</role>                        <grade>ST4</grade>                        <contact><![CDATA[07707911707]]></contact>                        <email><![CDATA[simon.bluhm@gmail.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>eve</session>                <revision>2</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>1.38</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>ca49c6da-ecde-491f-8cea-9cdecd669482</uuid>                        <name><![CDATA[Lucy BATES]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07765405987]]></contact>                        <email><![CDATA[lucy@familybates.plus.com]]></email>                    </member>                    <member>                        <uuid>ae696838-4229-4dd8-994d-ad3ee78e4cde</uuid>                        <name><![CDATA[Simon Bluhm]]></name>                        <role>trainee</role>                        <grade>ST4</grade>                        <contact><![CDATA[07707911707]]></contact>                        <email><![CDATA[simon.bluhm@gmail.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>night</session>                <revision>9</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>4.16</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>d99358d3-155f-4974-90d2-a586d70b0f42</uuid>                        <name><![CDATA[Sarah THORNTON]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07773202548]]></contact>                        <email><![CDATA[sjthornton@me.com]]></email>                    </member>                    <member>                        <uuid>5687904b-5b5e-49c6-b2dc-7769873348d3</uuid>                        <name><![CDATA[Thevakiropai Thurukumaran]]></name>                        <role>locum</role>                        <grade>None</grade>                        <email><![CDATA[07837 244 853]]></email>                    </member>                </staff>            </node>        </location>        <location name="HDU Outreach" uuid="2fc0b075-63dc-4957-adb9-1f756224abe2">                <node>                <date>2017-10-21</date>                <session>am</session>                <revision>1</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>1.25</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>87447e04-cdfe-428a-95d8-b3a916ea7fef</uuid>                        <name><![CDATA[Jeremy WOOD]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07811679982]]></contact>                        <email><![CDATA[jezden@hotmail.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>pm</session>                <revision>1</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>1.25</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>87447e04-cdfe-428a-95d8-b3a916ea7fef</uuid>                        <name><![CDATA[Jeremy WOOD]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07811679982]]></contact>                        <email><![CDATA[jezden@hotmail.com]]></email>                    </member>                </staff>            </node>        </location>        <location name="Obstetrics 1st on call" uuid="d5fa80c0-ef6c-4ce6-a157-9028b74a5d38">                <node>                <date>2017-10-21</date>                <session>eve</session>                <revision>1</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>4.16</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>c262a5e5-efaa-42aa-8381-876966202b4c</uuid>                        <name><![CDATA[Ahmed Tanveer]]></name>                        <role>trainee</role>                        <grade>None</grade>                        <contact><![CDATA[07979965806]]></contact>                        <email><![CDATA[tanveer344@hotmail.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>night</session>                <revision>3</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>4.16</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>4ec6f941-61b2-4b73-9a5a-87de05a930b5</uuid>                        <name><![CDATA[Insiya Susnerwala]]></name>                        <role>trainee</role>                        <grade>ST5</grade>                        <contact><![CDATA[07812931197]]></contact>                        <email><![CDATA[isusnerwala@doctors.net.uk]]></email>                    </member>                </staff>            </node>        </location>        <location name="General on call" uuid="050d9f69-47e8-44fd-889a-b290412925b0">                <node>                <date>2017-10-21</date>                <session>eve</session>                <revision>2</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>4.16</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>eda3d81a-d174-477a-a18e-896149cca78d</uuid>                        <name><![CDATA[Stewart MASHETER]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07890141297]]></contact>                        <email><![CDATA[smash33@sky.com]]></email>                    </member>                    <member>                        <uuid>65914ed9-7981-408c-88f9-a1756ad97152</uuid>                        <name><![CDATA[Tasneem Chasma]]></name>                        <role>trainee</role>                        <grade>None</grade>                        <contact><![CDATA[07710583965]]></contact>                        <email><![CDATA[tchasma@doctors.org.uk]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>night</session>                <revision>4</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>4.16</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>eda3d81a-d174-477a-a18e-896149cca78d</uuid>                        <name><![CDATA[Stewart MASHETER]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07890141297]]></contact>                        <email><![CDATA[smash33@sky.com]]></email>                    </member>                    <member>                        <uuid>9e561d2e-a640-4538-a39e-6be50690e5ec</uuid>                        <name><![CDATA[Benjamin Jones]]></name>                        <role>trainee</role>                        <grade>CT2</grade>                        <contact><![CDATA[07411668495]]></contact>                        <email><![CDATA[bjones7392@gmail.com]]></email>                    </member>                </staff>            </node>        </location>        <location name="Trauma Weekend" uuid="f1113a69-59df-4413-9295-6822a75cd25e">                <node>                <date>2017-10-21</date>                <session>am</session>                <revision>1</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>2.0</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>74ba1132-d4dc-498d-bcf0-f2737bf86c0a</uuid>                        <name><![CDATA[Khaled GIRGIRAH]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07769505797]]></contact>                        <email><![CDATA[girgirah@aol.com]]></email>                    </member>                </staff>            </node>                <node>                <date>2017-10-21</date>                <session>pm</session>                <revision>1</revision>                <status>published</status>                <changed>False</changed>                <title><![CDATA[oncall]]></title>                <speciality><![CDATA[None]]></speciality>                <coverType>extra</coverType>                <sessionValue>1.0</sessionValue>                <paValue>2.0</paValue>                <markers></markers>                <staff>                    <member>                        <uuid>74ba1132-d4dc-498d-bcf0-f2737bf86c0a</uuid>                        <name><![CDATA[Khaled GIRGIRAH]]></name>                        <role>consultant</role>                        <grade>None</grade>                        <contact><![CDATA[07769505797]]></contact>                        <email><![CDATA[girgirah@aol.com]]></email>                    </member>                </staff>            </node>        </location>    </locations></stream>'
    Meteor.call('parseXML', xml, (e, r) => {
      if (e) {
        console.log(e)
      } else {
        console.log(`ICU CONSULTANT DAY: ${r.stream.locations.location[0].node[0].staff.member[0].name}`)
        Session.set('ICUdayCons', r.stream.locations.location[0].node[0].staff.member[0].name)
        console.log(`ICU CONSULTANT NIGHT: ${r.stream.locations.location[0].node[3].staff.member[0].name}`)
        console.log(`ICU REGISTRAR DAY: ${r.stream.locations.location[0].node[0].staff.member[1].name}`)
        Session.set('ICUdayReg', r.stream.locations.location[0].node[0].staff.member[1].name)
        console.log(`ICU REGISTRAR NIGHT: ${r.stream.locations.location[0].node[3].staff.member[1].name}`)
        // console.log(r.stream.locations)
        console.log(`THEATRES CONSULTANT DAY: ${r.stream.locations.location[3].node[0].staff.member[0].name}`)
        console.log(`THEATRES CONSULTANT NIGHT: ${r.stream.locations.location[3].node[1].staff.member[0].name}`)
        console.log(`THEATRES REGISTRAR DAY: ${r.stream.locations.location[3].node[0].staff.member[1].name}`)
        console.log(`THEATRES REGISTRAR NIGHT: ${r.stream.locations.location[3].node[1].staff.member[1].name}`)
      }
    })
  },

})
