import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    console.error('❌ Missing Supabase config in server API')
    return {
      statusCode: 500,
      body: { error: 'Missing Supabase config' }
    }
  }

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseServiceRoleKey
  )

  try {
    // 1. Get all used image paths from "assets" table
    const { data: assets, error: assetsError } = await supabase
      .from('assets')
      .select('image')

    if (assetsError) throw assetsError

    const usedImages = assets
  .map(a => a.image?.split('/').pop())
  .filter(Boolean)
    console.log('📂 Used images:', usedImages)

    // 2. List all files from the "assets" storage bucket
    const { data: allFiles, error: filesError } = await supabase
      .storage
      .from('assets') // ✅ This is your real bucket name
      .list('', { limit: 1000, offset: 0 })

    if (filesError) throw filesError

    const unused = allFiles.filter(file => !usedImages.includes(file.name))
    console.log('🗑️ Unused files to delete:', unused.map(f => f.name))

    if (unused.length === 0) {
      return { message: '✅ No unused files to delete.' }
    }

    // 3. Delete unused files
    const { data: deleted, error: deleteError } = await supabase
      .storage
      .from('assets')
      .remove(unused.map(f => f.name))

    if (deleteError) throw deleteError

    console.log('✅ Deleted files:', deleted)

    return {
      message: `✅ Deleted ${deleted?.length || 0} unused files.`,
      deleted
    }

  } catch (err) {
    console.error('💥 Cleanup Error:', err)
    return {
      statusCode: 500,
      body: { error: err.message || 'Unknown error' }
    }
  }
})
