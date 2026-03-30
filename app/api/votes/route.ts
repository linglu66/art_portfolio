import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VOTES_FILE = path.join('/tmp', 'votes.json')

const DEFAULT_VOTES = {
  exercise_hours: 36,
  vegetables: 6,
  books: 40,
  paintings: 50,
  home_cooked: 32,
}

function getVotes(): Record<string, number> {
  try {
    if (fs.existsSync(VOTES_FILE)) {
      return JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'))
    }
  } catch {}
  fs.writeFileSync(VOTES_FILE, JSON.stringify(DEFAULT_VOTES))
  return { ...DEFAULT_VOTES }
}

function saveVotes(votes: Record<string, number>) {
  fs.writeFileSync(VOTES_FILE, JSON.stringify(votes))
}

export async function GET() {
  return NextResponse.json(getVotes())
}

export async function POST(req: NextRequest) {
  const { category } = await req.json()
  const votes = getVotes()
  if (votes[category] !== undefined) {
    votes[category]++
    saveVotes(votes)
    return NextResponse.json(votes)
  }
  return NextResponse.json({ error: 'Unknown category' }, { status: 404 })
}
