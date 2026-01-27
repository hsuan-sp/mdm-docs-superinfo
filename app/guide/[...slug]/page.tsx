"use client"

import { notFound } from 'next/navigation'

/**
 * Catch-all route for /guide/*
 * This ensures any non-existent paths under /guide will trigger 404
 */
export default function GuideCatchAll() {
  notFound()
}
