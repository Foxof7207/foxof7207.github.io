<template>
  <div class="guild-list">
    <a href="/guilds/ashwalker" class="guild-card">
      <img src="/ashwalkers_logo.png" alt="Ashwalkers Logo" class="guild-logo" />
      <div class="guild-info">
        <h2 class="guild-name">Ashwalkers</h2>
        <p class="guild-motto">"Rise from the ashes. Walk with us."</p>
        <p class="guild-owner"><strong>Owner:</strong> Geckzird</p>
      </div>
    </a>

    <a href="/guilds/everlook" class="guild-card">
      <img src="/everlook_logo.png" alt="Everlook Logo" class="guild-logo" />
      <div class="guild-info">
        <h2 class="guild-name">Everlook</h2>
        <p class="guild-motto">"Everlook is waiting for you."</p>
        <p class="guild-owner"><strong>Owner:</strong> RadisChat</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.guild-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.guild-card {
  display: flex;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.guild-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.guild-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 2rem;
  border-radius: 8px;
}

.guild-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.guild-name {
  margin: 0 0 0.5rem 0 !important;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: none !important;
  padding: 0 !important;
}

.guild-motto {
  margin: 0 0 0.5rem 0 !important;
  font-size: 1.1rem;
  font-style: italic;
  color: var(--vp-c-text-2);
}

.guild-owner {
  margin: 0 !important;
  font-size: 0.95rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 600px) {
  .guild-card {
    flex-direction: column;
    text-align: center;
  }
  
  .guild-logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
