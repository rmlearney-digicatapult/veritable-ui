import { expect } from 'chai'
import { DateTime } from 'luxon'
import { describe, it } from 'mocha'
import QueryListTemplates from '../queriesList.js'

describe('ConnectionTemplates', () => {
  const rawDate = new Date('2025-08-06T11:00:00Z')
  // Raw form date is timezone-less so the controller assumes UTC converted
  // to local timezone
  const dateAfterController = DateTime.fromJSDate(rawDate, { zone: 'utc' })
    .setZone('Europe/London', { keepLocalTime: true })
    .set({ second: 0, millisecond: 0 })
    .toJSDate()

  describe('listPage', () => {
    it('should render with no connections', async () => {
      const templates = new QueryListTemplates()
      const rendered = await templates.listPage([])
      expect(rendered).to.matchSnapshot()
    })
    it('should render with single query', async () => {
      const templates = new QueryListTemplates()
      const rendered = await templates.listPage([
        {
          id: 'someID',
          company_name: 'Company A',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
      ])
      expect(rendered).to.matchSnapshot()
    })
    it('should escape html in name', async () => {
      const templates = new QueryListTemplates()
      const rendered = await templates.listPage([
        {
          id: 'someID',
          company_name: '<div>I own you</div>',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
      ])
      expect(rendered).to.matchSnapshot()
    })
    it('should render multiple with each status', async () => {
      const templates = new QueryListTemplates()
      const rendered = await templates.listPage([
        {
          id: 'someID1',
          company_name: 'Company A',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID2',
          company_name: 'Company B',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID3',
          company_name: 'Company C',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID4',
          company_name: 'Company D',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID5',
          company_name: 'Company E',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID6',
          company_name: 'Company F',
          status: 'resolved',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
        {
          id: 'someID7',
          company_name: 'Company G',
          status: 'errored',
          type: 'total_carbon_embodiment',
          updated_at: dateAfterController,
          role: 'requester',
          expires_at: dateAfterController,
        },
      ])
      expect(rendered).to.matchSnapshot()
    })
  })
})
