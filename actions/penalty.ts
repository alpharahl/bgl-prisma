'use server'
import prisma from "@/lib/prisma";
import axios from "@/lib/axios";
import {auth} from "@/auth";
import { Series } from "@prisma/client";


type classifyReportProps = {
  description: string,
  offendingDriver: string,
  link: string,
  series: Series,
  carNumber: string,
  round: string,
  offendingDriverCarNumber: string,
}

const postDiscordMessage = async (series: Series, message: string, round: string, reportingDriver: string, offendingDriver: string) => {
  const data = {
        name: `${series.name} R${round}:  reports ${offendingDriver}`,
        message: {
          content: message
        },
        applied_tags: [series.reportTag]
      }
  console.log(data)
    const thread = await axios({
      url: `${process.env.DISCORD_API_BASE_URL}/channels/${process.env.DISCORD_PENALTY_CHANNEL}/threads`,
      method: 'POST',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      },
      data
    })
    return thread.data
}

export const classifyReport = async ({
  description,
  offendingDriver,
  offendingDriverCarNumber,
  carNumber,
  round,
  link,
  series
}: classifyReportProps) => {
  'use server'
  const session = await auth()
  if (!session){return}
  const reportMessage = await postDiscordMessage(series, `New ${series.name} Report - ${round}`, round, session.user.discordId, offendingDriver)
  const report = await prisma.report.create({
    data: {
      description,
      offendingDriver,
      reportingDriver: session.user.discordId,
      link,
      seriesId: series.id,
      message: reportMessage.id
    }
  })
  console.log('report', report)
  const penalties = await prisma.penalty.findMany({})
  const url = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`
  console.log(JSON.stringify(session.user))
  const response = await axios.post(url, {
      system_instruction: {
        parts: [
          {
            text: "You are to classify reports submitted for the sim racing league Broken Wing Racing League (BWRL). User's report their incidents, and you are to classify them to make it easier to work through them."
          },
          {
            text: JSON.stringify(penalties),
          },
          {
            text: "Classify the incident and place the related code in the penalty code."
          },
          {
            text: `The offending driver(s) is(are) ${offendingDriver}`,
          },
          {
            text: `The reporting driver is ${session?.user.discordId}`
          }
        ]
      },
      contents: {
        role: 'user',
        parts: [
          {
            text: description,
          }
        ]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: 'Object',
          required: [
            'incidentType',
            'incidentDescription',
            'offendingDriver',
            'reportingDriver',
            'penaltyCode',
            'penaltyPoints'
          ],
          properties: {
            incidentType: {
              type: 'string',
            },
            incidentDescription: {
              type: 'string',
            },
            offendingDriver: {
              type: 'string',
            },
            reportingDriver: {
              type: 'string',
            },
            penaltyCode: {
              type: 'number'
            },
            penaltyPoints: {
              type: 'number'
            }
          }
        }
      }

  })
  const {candidates} = response.data;
  if (candidates && candidates[0]){
    const parsedData = JSON.parse(candidates[0].content?.parts[0]?.text)
    await prisma.report.update({
      where: {
        id: report.id
      },
      data: {
        processedDescription: JSON.stringify(parsedData)
      }
    })
    const messageToSend = [
      `Report: ${description}`,
      `Penalty: ${parsedData.penaltyCode} - ${parsedData.incidentType}`,
      `Points: ${parsedData.penaltyPoints}`,
      `Offending Driver: ${offendingDriverCarNumber} - ${parsedData.offendingDriver}`,
      `Reporting Driver: ${carNumber} - <@${session.user.discordId}>`,
      `Link: ${link}`,
      `View Report: ${process.env.NEXT_PUBLIC_BASE_URL}/reports/${report.id}`
    ].join("\n")


    await axios({
      url: `https://discord.com/api/v10/channels/${reportMessage.id}/messages`,
      method: 'POST',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      },
      data: {
        content: messageToSend
      }
    })
  }

}