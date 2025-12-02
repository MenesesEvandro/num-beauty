<script setup>
import { ref, computed } from 'vue'
import { beautify } from 'num-beauty'

const number = ref(1234567.89)
const locale = ref('en-US')
const currency = ref('')
const decimals = ref(2)
const abbreviated = ref(false)
const stripZeros = ref(false)

const formatted = computed(() => {
  try {
    return beautify(number.value, {
      locale: locale.value,
      decimals: decimals.value,
      currency: currency.value || undefined,
      abbreviated: abbreviated.value,
      stripZeros: stripZeros.value
    })
  } catch (e) {
    return 'Error: ' + e.message
  }
})

const codeSnippet = computed(() => {
  const options = []
  if (locale.value !== 'en-US') options.push(`  locale: '${locale.value}'`)
  if (decimals.value !== 2) options.push(`  decimals: ${decimals.value}`)
  if (currency.value) options.push(`  currency: '${currency.value}'`)
  if (abbreviated.value) options.push(`  abbreviated: true`)
  if (stripZeros.value) options.push(`  stripZeros: true`)

  if (options.length === 0) {
    return `beautify(${number.value})`
  }

  return `beautify(${number.value}, {
${options.join(',\n')}
})`
})
</script>

<template>
  <div class="playground">
    <div class="controls">
      <div class="control-group">
        <label>Number</label>
        <input type="number" v-model="number" step="any" />
      </div>
      
      <div class="control-group">
        <label>Locale</label>
        <select v-model="locale">
          <option value="en-US">en-US (English)</option>
          <option value="pt-BR">pt-BR (Portuguese)</option>
          <option value="de-DE">de-DE (German)</option>
          <option value="ja-JP">ja-JP (Japanese)</option>
        </select>
      </div>

      <div class="control-group">
        <label>Currency</label>
        <select v-model="currency">
          <option value="">None</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="BRL">BRL (R$)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
      </div>

      <div class="control-group">
        <label>Decimals</label>
        <input type="number" v-model="decimals" min="0" max="20" />
      </div>

      <div class="toggles">
        <label>
          <input type="checkbox" v-model="abbreviated" />
          Abbreviated
        </label>
        <label>
          <input type="checkbox" v-model="stripZeros" />
          Strip Zeros
        </label>
      </div>
    </div>

    <div class="preview">
      <div class="result">{{ formatted }}</div>
      <div class="code">
        <pre><code>{{ codeSnippet }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background-color: var(--vp-c-bg-soft);
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: 600;
  font-size: 14px;
}

.control-group input,
.control-group select {
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.toggles {
  display: flex;
  gap: 16px;
  align-items: center;
  grid-column: 1 / -1;
}

.toggles label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.preview {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 20px;
}

.result {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: var(--vp-c-brand);
}

.code {
  background-color: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

pre {
  margin: 0;
}
</style>
