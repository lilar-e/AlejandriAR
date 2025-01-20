import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })


export async function POST(request: Request) {
  const { content } = await request.json()

  try {
    // Obtener el archivo actual
    const { data: file } = await octokit.repos.getContent({
      owner: 'lilar-e',
      repo: 'libraryJSON',
      path: 'data.json',
    })

    // Actualizar el archivo
    await octokit.repos.createOrUpdateFileContents({
      owner: 'lilar-e',
      repo: 'libraryJSON',
      path: 'data.json',
      message: 'Update data.json via Alejandria-XXI',
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating JSON:', error)
    return NextResponse.json({ success: false, error: 'Failed to update JSON' }, { status: 500 })
  }
}

