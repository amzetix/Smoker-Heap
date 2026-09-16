import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const product = await prisma.product.findUnique({
      where:   { slug },
      include: {
        category: true,
        brand:    true,
        variants: { orderBy: { sortOrder: 'asc' } },
      },
    })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
