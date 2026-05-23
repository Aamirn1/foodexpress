import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // In production, you would send this email or save to a database
    // For now, we just return a success response
    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
